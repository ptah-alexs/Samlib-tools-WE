var getting = browser.storage.local.get("state");
getting.then(samtools_add_buttons, onError);

function samtools_add_buttons(item)
{
    var head = document.getElementsByTagName('h2')[0];
    var links = document.getElementsByTagName('a')[0];
    var link = "";
    var comment_patern = /\/comment\//i;
    var book_patern = /другие произведения/i;
    var group_patern = /.shtml/;
    var url = 'http://vagrand.point.od.ua/download_book/?source_url';
    if (comment_patern.test(window.location)){
        var parts = window.location.toString().split('/');
        parts.splice(3,1);
        var re = /\?.*/;
        if (re.test(parts[parts.length - 1])){
            var h = parts[parts.length - 1].match(re);
            parts[parts.length - 1] = parts[parts.length - 1].slice(0,h['index']);
        };
        var t = parts.join('/') + '.shtml';
        link = '<a href="' + url + '=' + t + '" title="Скачать произведение" target="_blank">' + '<img src="' + chrome.extension.getURL('images/download.png') + '" border="0" style="vertical-align: middle;">' + '</a>&nbsp;';
        head.insertAdjacentHTML('afterBegin', link);
        if (item.state){
            var r = document.title.replace('Комментарии: ','');
            head.insertAdjacentHTML('beforeEnd', add_social_button(r, t));
        };
    } else if (book_patern.test(links.innerHTML)){
        link = '<a href="' + url + '=' + window.location + '" title="Скачать произведение" target="_blank">'+ '<img src="' + chrome.extension.getURL('images/download.png') + '" border="0" style="vertical-align: middle;">'+ '</a>&nbsp;';
        head.insertAdjacentHTML('afterBegin', link);
        if (item.state){
            head.insertAdjacentHTML('beforeEnd', add_social_button(document.title, window.location));
        };
    } else {
        var lis = document.getElementsByTagName('li');
        for (var index in lis){
            if (lis[index].parentElement.tagName == "DT"){
                for (var i=0;i<lis[index].children.length;i++){
                    if (lis[index].children[i].tagName == 'A'){
                        var anchor = lis[index].children[i].href;
                        if (group_patern.test(anchor)){
                            var b = lis[index].children[i].textContent;
                            lis[index].firstElementChild.insertAdjacentHTML('afterbegin', '<a href="'+url+'='+anchor+'" title="Скачать произведение" target="_blank"><img src="'+chrome.extension.getURL('images/download.png')+'" border="0" style="vertical-align: middle;"></a>&nbsp;');
                            if (item.state){
                                lis[index].lastElementChild.insertAdjacentHTML('afterEnd', add_social_button(b , anchor));
                            };
                        };
                    };
                };
            };
        };
    };
};

function onError(error) {
  console.log(`Error: ${error}`);
};

function add_social_button(title, url){
    var title = encodeURI(title);
    var table = '<table border="0"><tr>';
    table += '<td><a target="_blank" href="https://facebook.com/share.php?u=' + url + '"><img src="' + chrome.extension.getURL('images/icon_facebook.png') + '" border="0"></a></td>';
    table += '<td><a target="_blank" href="https://twitter.com/timeline/home?status=' + title + '%20' + url + '"><img src="' + chrome.extension.getURL('images/icon_twitter.png') + '" border="0"></a></td>';
    table += '<td><a target="_blank" href="https://vkontakte.ru/share.php?url=' + url + '"><img src="' + chrome.extension.getURL('images/icon_vk.png') + '" border="0"></a></td>';
    table += '<td><a target="_blank" href="https://ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + url + '&st.comments=' + title + '"><img src="' + chrome.extension.getURL('images/icon_odno.png') + '" border="0"></a></td>';
    table += '<td><a target="_blank" href="https://livejournal.com/update.bml?mode=full&subject=' + title + '&event=' + url + '"><img src="' + chrome.extension.getURL('images/icon_lj.png') + '" border="0"></a></td>';
    table += '<td><a target="_blank" href="https://connect.mail.ru/share?url=' + url + '&title=' + title + '&description=&imageurl="><img src="' + chrome.extension.getURL('images/icon_mymail.png') + '" border="0"></a></td>';
    table += '</tr></table>';
    return table;
};
