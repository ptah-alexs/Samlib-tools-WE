samtools_add_buttons();

function samtools_add_buttons()
{
    var head = document.getElementsByTagName('h2')[0];
    var links = document.getElementsByTagName('a');
    var commentPatern = /\/comment\//i, bookPatern = /другие произведения/i, groupPatern = /.shtml/;
    var url = 'http://vagrand.point.od.ua/download_book/?source_url';
    if (commentPatern.test(window.location)){
        var link_c = '<a href="' + url + '=http://samlib.ru' + head.firstElementChild.getAttribute('href') + '" title="Скачать произведение" target="_blank">' + '<img src="' + chrome.extension.getURL('images/download.png') + '" border="0" style="vertical-align: middle;">' + '</a>&nbsp;';
        head.insertAdjacentHTML('afterBegin', link_c);
    } else if (bookPatern.test(links[0].innerHTML)){
        var link = '<a href="' + url + '=' + window.location + '" title="Скачать произведение" target="_blank">'+ '<img src="' + chrome.extension.getURL('images/download.png') + '" border="0" style="vertical-align: middle;">'+ '</a>&nbsp;';
        head.insertAdjacentHTML('afterBegin', link);
    } else {
        var lis = document.getElementsByTagName('li');
        for (var index in lis){
            if (lis[index].parentElement.tagName == "DT"){
                for (var i=0;i<lis[index].children.length;i++){
                    if (lis[index].children[i].tagName == 'A'){
                        var anchor = lis[index].children[i].href;
                        if (groupPatern.test(anchor)){
                            lis[index].firstElementChild.insertAdjacentHTML('afterbegin', '<a href="'+url+'='+anchor+'" title="Скачать произведение" target="_blank"><img src="'+chrome.extension.getURL('images/download.png')+'" border="0" style="vertical-align: middle;"></a>');
                        };
                        
                    };
                };
            };
        };
    };
};
