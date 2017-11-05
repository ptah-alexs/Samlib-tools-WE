samtools_add_buttons();

function samtools_add_buttons()
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
        link = '<a href="' + url + '=http://' + parts[2] + head.firstElementChild.getAttribute('href') + '" title="Скачать произведение" target="_blank">' + '<img src="' + chrome.extension.getURL('images/download.png') + '" border="0" style="vertical-align: middle;">' + '</a>&nbsp;';
        head.insertAdjacentHTML('afterBegin', link);
    } else if (book_patern.test(links.innerHTML)){
        link = '<a href="' + url + '=' + window.location + '" title="Скачать произведение" target="_blank">'+ '<img src="' + chrome.extension.getURL('images/download.png') + '" border="0" style="vertical-align: middle;">'+ '</a>&nbsp;';
        head.insertAdjacentHTML('afterBegin', link);
    } else {
        var lis = document.getElementsByTagName('li');
        for (var index in lis){
            if (lis[index].parentElement.tagName == "DT"){
                for (var i=0;i<lis[index].children.length;i++){
                    if (lis[index].children[i].tagName == 'A'){
                        var anchor = lis[index].children[i].href;
                        if (group_patern.test(anchor)){
                            lis[index].firstElementChild.insertAdjacentHTML('afterbegin', '<a href="'+url+'='+anchor+'" title="Скачать произведение" target="_blank"><img src="'+chrome.extension.getURL('images/download.png')+'" border="0" style="vertical-align: middle;"></a>&nbsp;');
                        };
                    };
                };
            };
        };
    };
};
