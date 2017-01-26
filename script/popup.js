function onClickHandler(word) {
  var url = "https://www.google.com/search?q=" + encodeURIComponent(word);
  window.open(url, '_blank');
};

function createPopup(selText){
  chrome.notifications.create(
  'dictionary notification',{
  type: 'basic',
  iconUrl: 'image/icon.png',
  title: "Congrats :)",
  message: "Lexicon added to dictionary :)"
}, function(id){
  timer = setTimeout(function(){chrome.notifications.clear(id);}, 1000);
});
}

add_to_dictionary = function(word){
  chrome.storage.sync.set({
    word:'1'
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('popup_text');
    var w = 300;
    var h = 300;
    var left = (window.screen.width/2)-(w/2);
    var top = (window.screen.height/2)-(h/2);
    createPopup(word);
    // window.open('../popup.html','titlebar=0','menubar:0','titlebar=0','status=0');
    // onClickHandler();
    // chrome.windows.create({'url': '../popup.html','type': 'popup','width':w, 'height':h,'left':left,'top':top}, function(window) {
    //   // chrome.tabs.executeScript(window.tabs[0].id, {
    //   //   code: 'document.write("hello world");'
    //   // });
    //   alert(window.tabs[0].id.getElementById('popup_text'.innerHtml));
    // });
  });
}
chrome.runtime.onInstalled.addListener(function() {
chrome.contextMenus.create({
  title: "Add to my dictionary",
  contexts:["selection"],
  onclick: add_to_dictionary
});
});
