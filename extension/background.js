initialLocalStorage();

exceptCurrencies = [
    'INR'
]

// initial ...
function initialLocalStorage() {
    localStorage.title = '';
    localStorage.minPrice = '';
}


// Actions ...
function show(title, message, link) {
    var notification = new Notification(title, {
        icon: 'src/img/48.png',
        body: message
    });

    notification.addEventListener('click', function() {
        var query = title.replace(" ", "+");
        runScript(`
        window.open("` + link + `");
        `);
    })

}

const runScript = (script) => {
    chrome.tabs.executeScript(null, {
        code: script
    });
};

const playSound = (src) => {
    const sound = new Audio();
    sound.src = 'src/audio/' + src;
    sound.play();
};

function getDOM(class_name) {
    var arr_elements = document.getElementsByClassName(class_name);
    var arr_res = '';
    for (var i = 0; i < arr_elements.length; i++) {
        let element = arr_elements[i];
        arr_res += element.innerHTML;
        arr_res += ",";
    }
    return arr_res;
}


// functions...

const windowsLooping = () => {
    chrome.windows.getAll({ populate: true }, function(windows) {
        for (var i = 0; i < windows.length; ++i) {
            var w = windows[i];
            for (var j = 0; j < w.tabs.length; ++j) {
                var tab = w.tabs[j];
                var url = JSON.stringify(tab.url.split('/')[2]);

                // alert(url);

                if (url == '"party.pl"') {
                    location.reload();
                    runProcess(tab);
                }
            }
        }

    });
}

function vote() {
    element_photo_area = document.getElementsByClassName("photo-current");
    for (var i = 0; i < element_photo_area.length; i++) {
        var element = element_photo_area[i];
        var name = element.getElementsByClassName("name")[0].textContent;
        if (name == "Anna Maria Sieklucka") {
            var btnVote = element.getElementsByClassName("vote-button")[0];
            btnVote.click();
            console.log(name);
        }
    }
}

function runProcess(tab) {
    var script = '(' + vote + ')()';
    chrome.tabs.executeScript(tab.id, {
        code: script
    });
}

setInterval(function() {
    windowsLooping();
}, 1000);