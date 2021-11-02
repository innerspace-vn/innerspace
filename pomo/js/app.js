//Tabs
var pomodoros = document.getElementById("pomodoros");
var shortBreak = document.getElementById("shortBreak");
var longBreak = document.getElementById("longBreak");
var settings = document.getElementById("settings");
//Buttons
var startButton = document.getElementById("startButton");
var resetButton = document.getElementById("resetButton");
var stopButton = document.getElementById("stopButton");
var saveButton = document.getElementById("saveButton");
var clearButton = document.getElementById("clearButton");
var clearTasksButton = document.getElementById("clearTasksButton");
//Time left displayed
var timeLeftDisplay = document.getElementById("timeLeft");
//Inputs
var pomodoroInput = document.getElementById("pomodoroInput");
var shortBreakInput = document.getElementById("shortBreakInput");
var longBreakInput = document.getElementById("longBreakInput");
var autoStartRoundsInput = document.getElementById("autoStartRoundsInput");
var tickSoundInput = document.getElementById("tickSoundInput");
var darkModeToggle = document.getElementById("darkModeToggle");
var notificationTextInput = document.getElementById("notificationTextInput");
var backgroundMusicOptions = document.getElementById("backgroundMusicOptions");
var longBreakIntervalInput = document.getElementById("longBreakIntervalInput");

var locationUpdateLog = document.getElementById("locationUpdateLog");
var listOfTasks = document.getElementById("listOfTasks");

var progressValue = document.querySelector(".progress-value");
var notificationTime;
var titleDisplayText;
var currentTab;
var timerButtonClicked;
var currentStartTime;
var currentEndTime;
var currentDate;

var allPossibleModes = {
	pomodoro: {
		input: pomodoroInput,
		defaultTime: 25,
		navButton: pomodoros,
		localStorage: localStorage.currentPomodoroValue,
		alertMessage: "<strong>Bạn đã hoàn thành rất tốt công việc!</strong> Hãy dành chút thời gian nghỉ ngơi nhé!",
		titleDisplayText: "Cùng làm việc hiệu quả nha!",
		progressColor: "#e6717c",
		sound: new Howl({
			src: ["pomo/assets/sounds/alert-work.mp3"],
		}),
	},
	"long break": {
		input: longBreakInput,
		defaultTime: 20,
		navButton: longBreak,
		localStorage: localStorage.currentLongBreakValue,
		alertMessage: "<strong>Đã hết thời gian Nghỉ Dài!</strong> Cùng quay lại làm việc nha!",
		titleDisplayText: "Nghỉ ngơi thôi!",
		progressColor: "#66afff",
		sound: new Howl({
			src: ["pomo/assets/sounds/alert-long-break.mp3"],
		}),
	},
	"short break": {
		input: shortBreakInput,
		defaultTime: 5,
		navButton: shortBreak,
		localStorage: localStorage.currentShortBreakValue,
		alertMessage: "<strong>Đã hết thời gian Nghỉ Ngắn!</strong> Cùng quay lại làm việc nha!",
		titleDisplayText: "Nghỉ ngơi chút xíu nhé!",
		progressColor: "#68c17c",
		sound: new Howl({
			src: ["pomo/assets/sounds/alert-short-break.mp3"],
		}),
	},
};

// All Sound Effects
tick = new Howl({
	src: ["pomo/assets/sounds/tick.mp3"],
	volume: 2,
});

notification = new Howl({
	src: ["pomo/assets/sounds/notification-bell.mp3"],
	volume: 1,
});

//Background Music
allBackgroundMusic = {
	"Mưa rơi": new Howl({
		src: ["pomo/assets/sounds/background_music/muaroi.mp3"],
		volume: 1,
		loop: true,
	}),
	"Mưa rào": new Howl({
		src: ["pomo/assets/sounds/background_music/muarao.mp3"],
		volume: 1,
		loop: true,
	}),
	"Mưa bão": new Howl({
		src: ["pomo/assets/sounds/background_music/muabao.mp3"],
		volume: 1,
		loop: true,
	}),
	"Sóng biển": new Howl({
		src: ["pomo/assets/sounds/background_music/songbien.mp3"],
		volume: 1,
		loop: true,
	}),
	"Sông suối": new Howl({
		src: ["pomo/assets/sounds/background_music/songsuoi.mp3"],
		volume: 1,
		loop: true,
	}),
	"Trong rừng": new Howl({
		src: ["pomo/assets/sounds/background_music/trongrung.mp3"],
		volume: 1,
		loop: true,
	}),
	"Lửa trại": new Howl({
		src: ["pomo/assets/sounds/background_music/luatrai.mp3"],
		volume: 1,
		loop: true,
	}),
	"Gió nhẹ": new Howl({
		src: ["pomo/assets/sounds/background_music/gionhe.mp3"],
		volume: 1,
		loop: true,
	}),
	"Sa mạc lộng gió": new Howl({
		src: ["pomo/assets/sounds/background_music/samaclonggio.mp3"],
		volume: 1,
		loop: true,
	}),
	'Mèo kêu "rừ rừ"': new Howl({
		src: ["pomo/assets/sounds/background_music/meokeururu.mp3"],
		volume: 1,
		loop: true,
	}),
	"Rừng mưa nhiệt đới": new Howl({
		src: ["pomo/assets/sounds/background_music/rungmuanhietdoi.mp3"],
		volume: 1,
		loop: true,
	}),
	"Thiền Chánh niệm": new Howl({
		src: ["https://rawcdn.githack.com/serenyvietnam/sereny/57687799c4259436525cc3535154f189b47d357e/pomo/assets/sounds/background_music/mindfulness45p.mp3"],
		volume: 1,
		loop: true,
	}),
	"Thiền Chánh niệm x Âm thanh thiên nhiên": new Howl({
		src: ["https://rawcdn.githack.com/serenyvietnam/sereny/e364bdabafb166811e56b4c574c16e3c27a52497/pomo/assets/sounds/background_music/mindfulness10pdailycalm.mp3"],
		volume: 1,
		loop: true,
	}),
};

init();

function init() {
	currentTab = "pomodoro";
	makePillsActive(currentTab);
	contentDisplay();
	buttonsDefaultState();
	displayTickSoundValue();
	displayTimeInputValues();
	displayNotificationValue();
	displayBackGroundMusic();
	displayDarkMode();
	displayLog();
	displayTodoList();
	displayLongBreakInterval();
	displayAutoStartBreak();
}

//=========================Initialise Default/Local Storage values=================================================
function displayTickSoundValue() {
	if (localStorage.tickSoundInputValue === "true") {
		tickSoundInput.checked = localStorage.tickSoundInputValue;
	} else {
		tickSoundInput.checked = false;
	}
}

function displayTimeInputValues() {
	modesList = ["pomodoro", "short break", "long break"];
	for (var i = 0; i < modesList.length; i++) {
		if (allPossibleModes[modesList[i]].localStorage) {
			allPossibleModes[modesList[i]].input.value = allPossibleModes[modesList[i]].localStorage;
		} else {
			allPossibleModes[modesList[i]].input.value = allPossibleModes[modesList[i]].defaultTime;
		}
	}
}

function displayNotificationValue() {
	if (localStorage.notificationTextInputValue) {
		notificationTextInput.value = localStorage.notificationTextInputValue;
	} else {
		notificationTextInput.value = 1;
	}
}

function displayBackGroundMusic() {
	if (localStorage.backgroundMusicOptionsValue) {
		backgroundMusicOptions.value = localStorage.backgroundMusicOptionsValue;
	} else {
		backgroundMusicOptions.value = "Tắt";
	}
}

function displayDarkMode() {
	if (localStorage.darkModeToggleValue === "true") {
		darkModeToggle.checked = localStorage.darkModeToggleValue;
		darkMode();
	} else {
		darkModeToggle.checked = false;
	}
}

function displayLog() {
	if (localStorage.logContents !== undefined) {
		if (localStorage.logContents.indexOf("tr") === -1) {
			showNoDataLoggedText();
		} else {
			locationUpdateLog.innerHTML = localStorage.logContents;
			removeNoDataLoggedText();
		}
	}
}

function displayTodoList() {
	if (localStorage.todoContents !== undefined) {
		if (localStorage.todoContents.indexOf("li") === -1) {
			showNoTaskTodayText();
		} else {
			//List is not empty
			listOfTasks.innerHTML = localStorage.todoContents;
			removeNoTaskTodayText();
		}
	}
}

function displayLongBreakInterval() {
	if (localStorage.longBreakInterval !== undefined) {
		longBreakIntervalInput.value = localStorage.longBreakInterval;
	} else {
		longBreakIntervalInput.value = 4;
	}
	if (localStorage.sliderValue != undefined) {
		sliderValue.innerHTML = localStorage.sliderValue;
	} else {
		sliderValue.innerHTML = 4;
	}
}

function displayAutoStartBreak() {
	if (localStorage.autoStartRoundsInputValue === "true") {
		autoStartRoundsInput.checked = localStorage.autoStartRoundsInputValue;
	} else {
		autoStartRoundsInput.checked = false;
	}
}

pomodoros.addEventListener("click", function () {
	currentTab = "pomodoro";
	makePillsActive(currentTab);
	contentDisplay();
	resetTimer();
	buttonsDefaultState();
	stopBackGroundMusic();
	numberSessions = 0;
});

shortBreak.addEventListener("click", function () {
	currentTab = "short break";
	makePillsActive(currentTab);
	contentDisplay();
	resetTimer();
	buttonsDefaultState();
	stopBackGroundMusic();
	numberSessions = 0;
});

longBreak.addEventListener("click", function () {
	currentTab = "long break";
	makePillsActive(currentTab);
	contentDisplay();
	resetTimer();
	buttonsDefaultState();
	stopBackGroundMusic();
	numberSessions = 0;
});

//Function that takes 1 away from timeLeft every 1000ms/1s
var updateSeconds = null;

function countDown() {
	playBackGroundMusic();
	currentStartTime = getTime();
	currentDate = getDate();
	updateSeconds = setInterval(function () {
		timeLeft -= 1;
		if (timeLeft >= 1) {
			timeLeftDisplay.innerHTML = secondsToMinutes(timeLeft);
			titleTimeDisplay();
			document.title = secondsToMinutes(timeLeft) + " - " + titleDisplayText;
			progressDisplay();
			playTickSound();
			playEndingNotification();
		} else {
			timeLeft = 0;
			timeLeftDisplay.innerHTML = secondsToMinutes(timeLeft);
			titleTimeDisplay();
			showAlertMessage(currentTab);
			document.title = secondsToMinutes(timeLeft) + " - " + titleDisplayText;
			clearInterval(updateSeconds);
			allPossibleModes[currentTab].sound.play();
			stopBackGroundMusic();
			currentEndTime = getTime();
			addDataToLog();
			startNextRound();
		}
	}, 1000);
}

function resetTimer() {
	clearInterval(updateSeconds);
	timerRunning = false;
	//If user entered some input
	if (allPossibleModes[currentTab].localStorage) {
		//Then use the input the user enters
		timeLeft = minutesToSeconds(allPossibleModes[currentTab].localStorage);
	} else {
		//Else use default input
		timeLeft = minutesToSeconds(allPossibleModes[currentTab].defaultTime);
	}
	//Display input
	timeLeftDisplay.innerHTML = secondsToMinutes(timeLeft);
	document.title = "Mindful Pomo | Sereny";
	progressDisplay();
}

function stopTimer() {
	clearInterval(updateSeconds);
	timerRunning = false;
}
//Buttons
var timerRunning = false;
var timerButtonClicked;
startButton.addEventListener("click", function () {
	if (timerRunning === false) {
		timerRunning = true;
		countDown();
	}
	makeTimerButtonActive(this);
});

resetButton.addEventListener("click", function () {
	resetTimer();
	makeTimerButtonActive(this);
	stopBackGroundMusic();
});

stopButton.addEventListener("click", function () {
	stopTimer();
	makeTimerButtonActive(this);
	stopBackGroundMusic();
});

function makePillsActive(session) {
	allPossibleModes[session].navButton.classList.add("active");
	allPossibleModes[session].navButton.style.fontSize = "1.15rem";
	allSessions = Object.keys(allPossibleModes);
	allSessions.forEach(function (sessionType) {
		if (sessionType !== session) {
			allPossibleModes[sessionType].navButton.classList.remove("active");
			allPossibleModes[sessionType].navButton.style.fontSize = "1.1rem";
		}
	});
}

function makeTimerButtonActive(buttonClicked) {
	allTimerButtons = [startButton, stopButton, resetButton];
	buttonClicked.style.fontSize = "1.28rem";
	buttonClicked.classList.add("active");
	buttonClicked.classList.add("buttonClicked");
	allTimerButtons.forEach(function (button) {
		if (button !== buttonClicked) {
			button.style.fontSize = "1.3rem";
			button.classList.remove("active");
			button.classList.remove("buttonClicked");
		}
	});
}
//Content Display
function contentDisplay() {
	if (allPossibleModes[currentTab].localStorage) {
		timeLeft = minutesToSeconds(allPossibleModes[currentTab].localStorage);
	} else {
		timeLeft = minutesToSeconds(allPossibleModes[currentTab].defaultTime);
	}
	timeLeftDisplay.innerHTML = secondsToMinutes(timeLeft);
}
//When input is updated
pomodoroInput.addEventListener("change", function () {
	localStorage.currentPomodoroValue = pomodoroInput.value;
	allPossibleModes["pomodoro"].localStorage = localStorage.currentPomodoroValue;
	pomodoroInput.value = localStorage.currentPomodoroValue;
	contentDisplay();
});
shortBreakInput.addEventListener("change", function () {
	localStorage.currentShortBreakValue = shortBreakInput.value;
	allPossibleModes["short break"].localStorage = localStorage.currentShortBreakValue;
	shortBreakInput.value = localStorage.currentShortBreakValue;
	contentDisplay();
});
longBreakInput.addEventListener("change", function () {
	localStorage.currentLongBreakValue = longBreakInput.value;
	allPossibleModes["long break"].localStorage = localStorage.currentLongBreakValue;
	longBreakInput.value = localStorage.currentLongBreakValue;
	contentDisplay();
});

function titleTimeDisplay() {
	titleDisplayText = allPossibleModes[currentTab].titleDisplayText;
}

//=================Notificiation, Ticking Sounds and Background Music=======================
notificationTextInput.addEventListener("change", function () {
	localStorage.notificationTextInputValue = notificationTextInput.value;
});

backgroundMusicOptions.addEventListener("change", function () {
	localStorage.backgroundMusicOptionsValue = backgroundMusicOptions.value;
	stopBackGroundMusic();
	playBackGroundMusic();
});

function playTickSound() {
	if (tickSoundInput.checked) {
		tick.play();
	}
}

tickSoundInput.addEventListener("change", function () {
	localStorage.tickSoundInputValue = tickSoundInput.checked;
});

function playEndingNotification() {
	notificationTime = notificationTextInput.value;
	if (timeLeft === Number(minutesToSeconds(notificationTime))) {
		notification.play();
	}
}

function playBackGroundMusic() {
	if (backgroundMusicOptions.value !== "Tắt") {
		if (timerRunning) {
			allBackgroundMusic[backgroundMusicOptions.value].play();
		}
	}
}

function stopBackGroundMusic() {
	for (var allSounds in allBackgroundMusic) {
		allBackgroundMusic[allSounds].stop();
	}
}
//===========Calculate percentage complete for progress bar================================
var degreeOfCircle;

function progressDisplay() {
	var totalMinutes;
	if (allPossibleModes[currentTab].localStorage) {
		totalMinutes = minutesToSeconds(allPossibleModes[currentTab].localStorage);
	} else {
		totalMinutes = minutesToSeconds(allPossibleModes[currentTab].defaultTime);
	}
	degreeOfCircle = ((totalMinutes - timeLeft) / totalMinutes) * 360;
	progressColor = allPossibleModes[currentTab].progressColor;
	if (degreeOfCircle <= 180) {
		progressValue.style.backgroundImage = `-webkit-linear-gradient(${degreeOfCircle}deg, ${progressColor} 50%, transparent 50%), -webkit-linear-gradient(left, #fff 50%, ${progressColor} 50%)`;
	} else {
		progressValue.style.backgroundImage = `-webkit-linear-gradient(left, #ddd 50%, transparent 50%), -webkit-linear-gradient(${(
			Number(degreeOfCircle) - 180
		).toString()}deg, #ddd 50%, ${progressColor} 50%)`;
	}
}

//=========================Minutes and Seconds converter==========================================
function secondsToMinutes(s) {
	var minutes = Math.floor(s / 60);
	var seconds = s % 60;
	if (seconds.toString().length === 1) {
		seconds = "0" + seconds.toString();
	}
	if (minutes.toString().length === 1) {
		minutes = "0" + minutes.toString();
	}
	return minutes + ":" + seconds.toString();
}

function minutesToSeconds(m) {
	var seconds = m * 60;
	return seconds;
}
//====================================Dark and Light Modes======================================
darkModeToggle.addEventListener("change", function () {
	if (darkModeToggle.checked) {
		darkMode();
	} else if (darkModeToggle.checked === false) {
		lightMode();
	}
	localStorage.darkModeToggleValue = darkModeToggle.checked;
});


/**delete dark mode & light mode setting */

// ================================Get Time and Date=================================================
function getDate() {
	monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var today = new Date();
	var date = today.getDate();
	var month = monthList[today.getMonth()];
	var year = today.getFullYear();
	return date + " " + month + " " + year;
}

function getTime() {
	var amOrPm = " AM";
	var today = new Date();
	var hours = today.getHours();
	if (Number(hours) > 12) {
		amOrPm = " PM";
		hours = Number(hours) % 12;
	}
	if (Number(hours) === 12) {
		amOrPm = " PM";
	}
	var minutes = today.getMinutes();
	if (minutes.toString().length === 1) {
		minutes = "0" + minutes;
	}
	var time = hours + ":" + minutes + amOrPm;
	return time;
}
// ================================Adding date and time to log=================================================
function addDataToLog() {
	var sessionsCol = document.createElement("th");
	sessionsCol.setAttribute("scope", "row");
	if (currentTab === "pomodoro") {
		var sessionData = document.createTextNode("Focus");
	} else if (currentTab === "short break") {
		var sessionData = document.createTextNode("Short Break");
	} else if (currentTab === "long break") {
		var sessionData = document.createTextNode("Long Break");
	}

	sessionsCol.appendChild(sessionData);

	var dateCol = document.createElement("td");
	dateData = document.createTextNode(currentDate);
	dateCol.appendChild(dateData);

	var startTimeCol = document.createElement("td");
	data = document.createTextNode(currentStartTime);
	startTimeCol.appendChild(data);

	var endTimeCol = document.createElement("td");
	data = document.createTextNode(currentEndTime);
	endTimeCol.appendChild(data);

	var timeCol = document.createElement("td");
	if (allPossibleModes[currentTab].localStorage === undefined) {
		data = document.createTextNode(allPossibleModes[currentTab].defaultTime + " min");
		timeCol.appendChild(data);
	} else {
		data = document.createTextNode(allPossibleModes[currentTab].localStorage + " min");
		timeCol.appendChild(data);
	}
	var row = document.createElement("tr");
	row.setAttribute("scope", "row");
	row.appendChild(sessionsCol);
	row.appendChild(dateCol);
	row.appendChild(startTimeCol);
	row.appendChild(endTimeCol);
	row.appendChild(timeCol);
	row.innerHTML += '<td><input class="form-control" type="text" placeholder="" onchange="storeLogDescription(this)"></td>';
	row.innerHTML +=
		'<td><button type="button" class="close" onclick = "deleteLog(this)" aria-label="Close"><i class="fas fa-trash-alt"></i></button></td>';
	locationUpdateLog.appendChild(row);
	storeLogItems();
	removeNoDataLoggedText();
}
// ================================Clear log===================================================
clearButton.addEventListener("click", function () {
	locationUpdateLog.innerHTML = "";
	storeLogItems();
	showNoDataLoggedText();
});
// ===============================Delete log=================================================
function deleteLog(item) {
	item.parentNode.parentNode.style.transition = "all 0.2s ease-in";
	item.parentNode.parentNode.classList.add("slide-away");
	item.parentNode.parentNode.addEventListener("transitionend", function () {
		item.parentNode.parentNode.remove();
		storeLogItems();
		if (logIsEmpty()) {
			showNoDataLoggedText();
		}
	});
}
// ===========================Local Storage for Logging==============================================
function storeLogItems() {
	localStorage.logContents = locationUpdateLog.innerHTML;
}

function storeLogDescription(item) {
	item.outerHTML = '<td><input class="form-control" type="text" value="' + item.value + '" onchange="storeLogDescription(this)"></td>';
	storeLogItems();
}
// =====================================No logging data text===============================================
function showNoDataLoggedText() {
	document.getElementById("NoDataLoggedText").style.display = "block";
}

function removeNoDataLoggedText() {
	document.getElementById("NoDataLoggedText").style.display = "none";
}

function logIsEmpty() {
	return localStorage.logContents.indexOf("tr") === -1;
}
//==========================Todo list============================================================
var taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keypress", function () {
	if (event.key === "Enter") {
		submitTask();
	}
});
function submitTask() {
	if (taskInput.value !== "") {
		displayTasks();
		taskInput.value = "";
		storeTasks();
	}
}

var taskItem;
var listOfTasks = document.getElementById("listOfTasks");

function displayTasks() {
	var listItem = document.createElement("li");
	var todo = document.createTextNode(taskInput.value);
	listItem.appendChild(todo);
	listItem.setAttribute("class", "list-group-item");
	listItem.setAttribute("onclick", "checkedWhenclicked(this)");
	listItem.setAttribute("onmouseover", "taskMouseOver(this)");
	listItem.setAttribute("onmouseout", "taskMouseOut(this)");
	listItem.setAttribute("style", "cursor:pointer; overflow-wrap: break-word;");
	var completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-trash-alt fa-sm"></i>';
	completedButton.classList.add("close");
	completedButton.setAttribute("onclick", "deleteTasks(this)");
	listItem.appendChild(completedButton);
	listOfTasks.appendChild(listItem);
	storeTasks();
	removeNoTaskTodayText();
}

function checkedWhenclicked(item) {
	item.style.transition = "all 0.2s ease-in";
	item.classList.toggle("done");
	storeTasks();
}

function deleteTasks(item) {
	item.parentElement.style.transition = "all 0.2s ease-in";
	item.parentElement.classList.add("slide-away");
	item.parentElement.addEventListener("transitionend", function () {
		item.parentElement.remove();
		storeTasks();
		if (listIsEmpty()) {
			showNoTaskTodayText();
		}
	});
}
clearTasksButton.addEventListener("click", function () {
	listOfTasks.innerHTML = "";
	storeTasks();
	showNoTaskTodayText();
});

function taskMouseOver(item) {
	item.style.fontSize = "1.2rem";
	item.style.transition = "100ms";
}

function taskMouseOut(item) {
	item.style.fontSize = "1rem";
	item.style.transition = "100ms";
}
// ================================Local storage for todo list==========================================
function storeTasks() {
	localStorage.todoContents = listOfTasks.innerHTML;
}
// ====================================No task Today Text====================================================
function showNoTaskTodayText() {
	document.getElementById("NoTaskTodayText").style.display = "block";
}

function removeNoTaskTodayText() {
	document.getElementById("NoTaskTodayText").style.display = "none";
}

function listIsEmpty() {
	return localStorage.todoContents.indexOf("li") === -1;
}
// ======================================Start Next Rounds===================================================
longBreakIntervalInput.addEventListener("input", function () {
	localStorage.longBreakInterval = Number(longBreakIntervalInput.value);
	localStorage.sliderValue = Number(longBreakIntervalInput.value);
	sliderValue.innerHTML = localStorage.sliderValue;
});

var numberSessions = 0;

function startNextRound() {
	//if not time for long break play short break
	if (currentTab === "pomodoro" && numberSessions === Number(localStorage.longBreakInterval) - 1) {
		//play long break
		numberSessions = 0;
		currentTab = "long break";
		makePillsActive(currentTab);
		contentDisplay();
		resetTimer();
		buttonsDefaultState();
		stopBackGroundMusic();
		if (autoStartRoundsInput.checked) {
			autoStartTimer();
		}
	} else if (currentTab === "pomodoro") {
		//play short break
		numberSessions += 1;
		currentTab = "short break";
		makePillsActive(currentTab);
		contentDisplay();
		resetTimer();
		buttonsDefaultState();
		stopBackGroundMusic();
		if (autoStartRoundsInput.checked) {
			autoStartTimer();
		}
	} else if (currentTab === "short break") {
		//play pomodoros
		currentTab = "pomodoro";
		makePillsActive(currentTab);
		contentDisplay();
		resetTimer();
		buttonsDefaultState();
		stopBackGroundMusic();
		if (autoStartRoundsInput.checked) {
			autoStartTimer();
		}
	} else if (currentTab === "long break") {
		//play pomodoros
		currentTab = "pomodoro";
		makePillsActive(currentTab);
		contentDisplay();
		resetTimer();
		buttonsDefaultState();
		stopBackGroundMusic();
		if (autoStartRoundsInput.checked) {
			autoStartTimer();
		}
	}
}
// ==================================Auto Start Next Round=====================================
function autoStartTimer() {
	if (timerRunning === false) {
		timerRunning = true;
		countDown();
	}
}
autoStartRoundsInput.addEventListener("change", function () {
	localStorage.autoStartRoundsInputValue = autoStartRoundsInput.checked;
});

function buttonsDefaultState() {
	timerButtonClicked = undefined;
	startButton.classList.remove("active");
	stopButton.classList.remove("active");
	resetButton.classList.remove("active");
	startButton.style.fontSize = "1.3rem";
	stopButton.style.fontSize = "1.3rem";
	resetButton.style.fontSize = "1.3rem";
	startButton.classList.remove("buttonClicked");
	stopButton.classList.remove("buttonClicked");
	resetButton.classList.remove("buttonClicked");
}
// ============================Alerts==============================================================
var alert = document.querySelector(".alert");
var alertMessage = document.querySelector("#alertMessage");

function showAlertMessage(session) {
	alert.style.display = "block";
	if (session === "pomodoro") {
		alert.classList.add("alert-danger");
		alert.classList.remove("alert-success");
		alert.classList.remove("alert-primary");
	} else if (session === "short break") {
		alert.classList.remove("alert-danger");
		alert.classList.add("alert-success");
		alert.classList.remove("alert-primary");
	} else if (session === "long break") {
		alert.classList.remove("alert-danger");
		alert.classList.remove("alert-success");
		alert.classList.add("alert-primary");
	}
	alertMessage.innerHTML = allPossibleModes[session].alertMessage;
	setTimeout(dismissAlert, 3000);
}

function dismissAlert() {
	alert.style.display = "none";
}
// ===========================Scroll Indicator====================================================
window.addEventListener("scroll", moveScrollIndicator);
const scrollIndicatorElt = document.getElementById("scrollIndicator");
const maxHeight = window.document.body.scrollHeight - window.innerHeight;

function moveScrollIndicator(e) {
	const percentage = (window.scrollY / maxHeight) * 100;
	scrollIndicatorElt.style.width = percentage + "%";
}
// =====================Back to Top Button===========================================================
window.addEventListener("scroll", displayScrollButton);

function displayScrollButton() {
	var scrollSection = document.querySelector(".scrolltop-wrap");
	var scrollAmount = window.scrollY;
	const maxHeight = window.document.body.scrollHeight - window.innerHeight;
	if (scrollAmount >= maxHeight - 1300) {
		scrollSection.style.display = "block";
	} else {
		scrollSection.style.display = "none";
	}
}
var scrollButton = document.querySelector(".back-to-top-button");
scrollButton.addEventListener("click", function () {
	window.scroll({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
});
// ===================Input Validation==================================================
$('input[type="number"]').attr(
	"onkeypress",
	"return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 46 && event.charCode <= 57"
);


window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "UA-169261747-1");





//***Toggle Fullscreen***/
function toggleFullScreen() {
	if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
	 (!document.mozFullScreen && !document.webkitIsFullScreen)) {
	  if (document.documentElement.requestFullScreen) {  
		document.documentElement.requestFullScreen();  
	  } else if (document.documentElement.mozRequestFullScreen) {  
		document.documentElement.mozRequestFullScreen();  
	  } else if (document.documentElement.webkitRequestFullScreen) {  
		document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
	  }  
	} else {  
	  if (document.cancelFullScreen) {  
		document.cancelFullScreen();  
	  } else if (document.mozCancelFullScreen) {  
		document.mozCancelFullScreen();  
	  } else if (document.webkitCancelFullScreen) {  
		document.webkitCancelFullScreen();  
	  }  
	}  
  }