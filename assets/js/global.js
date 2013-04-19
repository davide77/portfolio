var PortfolioDD = function() {


        function init() {
            navigation();
            attachLoading();
            removeLoading();
            opernerPortfolio();
            slideImages();
            openFooter();
         }
 
            function navigation() {
                var $items;

                $items = $('#menu a');

                $items.on('click', function (e) {
                    var selected;

                    e.preventDefault();

                    $selected = $(this);

                    // update navigation links
                    $items.removeClass('active');
                    $selected.addClass('active');

                    // show content
                    $('#container .section').hide();
                    $('#' + $selected.attr('href').split('#')[1]).show();
                });

                // set default page
                $items.first().click();
            }

            function attachLoading(cont, style) {
                    if (typeof(style) == 'undefined') {
                        style = 'light';
                    }

                    $(cont).find('a').hide();
                    $(cont).append('<div class="loading-container" style="color:#fff;position:absolute;top:50%;left: 50%; margin-left:-25px;">' +
                        '<img class="loading" src="assets/images/'+style+'.gif" width="33" height="34" alt="Loading"></div>'
                    );
            }
            
            function removeLoading(cont, dur, callback) {
                    if (typeof(dur) == undefined) {
                        dur = 500;
                    }

                    if (typeof(callback) == 'undefined') {
                        callback = function() {};
                    }

                    $('.loading-container').remove();
                    $(cont).find('a').show();
                    $('.loading').fadeOut(dur, callback);

                     
                    $('ul.wrap').fadeIn(500);
                   
            }
        
                    var i, page, pages, found, pos, maxPos, newProjects;
                    pos = 0;

                    pages = ['fido', 'kerby', 'the-bourne-legacy', 'toyota', 'toyota-goodwood', 'cia'].concat(_.shuffle(['saint', 'wwf', 'aerte', 'mancini', 'boux', 'casedisiza', 'dadhonda', 'celebrity', 'gsk', 'heinz', 'inmarsat', 'isatphone', 'philips', 'qutenza', 'qutenza2', 'rednose', 'renault', 'rimatravel', 'secretsales', 'skyemail', 'skyemail2', 'skyemail3', 'tadpoles', 'thomson', 'timberland',  'xbox' ]));
                    newProjects = ['fido', 'kerby'];
                    maxPos = Math.round(pages.length / 6 + 0.49);

                    show = function (pos) {
                        var id, loadCount;
                        attachLoading('');
                        $('.media-box .prev').toggleClass('disabled', pos === 0);
                        $('.media-box .next').toggleClass('disabled', maxPos - 1 === pos);

                        $('.media-box #projects h1.title').text(pos === 0 ? 'Recent projects' : 'Past projects');


                        $('#projects ul.wrap').empty();

                        loadCount = 0;

                        $("#tabmenunav a").removeClass('active').eq(pos).addClass('active');

                         

                      

                        for (i = 0; i < 6; i++) {
                            id = pages[pos * 6 + i];
                            
                            if (id === undefined) {
                                // nothing
                            } else {
                                $('<li data-id="' + id + '" class="' + (newProjects.indexOf(id) >= 0 ? 'new' : '') + '"><a class="img-project" href="#' + id + '"><img src="assets/images/work/thumb/' + id + '.png"><article class="hover"><span><h2>' + id + '</h2><div class="hover-right">view project</div></span></article></a></li>')
                                .appendTo($('#projects ul.wrap'))
                                    .on('mouseenter', function () {
                                            $(this).find('img').stop().fadeTo('slow', '0.5');
                                            $(this).find('.hover').stop().animate({'opacity': '1', 'top': '50%'}, 200);
                                            $('.hover-right').stop().animate({ marginTop: 0 }, 200);
                                            $('.hover h2').stop().animate({ marginTop: 0 }, 200);

                                    })
                                    .on('mouseleave', function () {
                                            $(this).find('img').stop().fadeTo('slow', '1');
                                            $(this).find('.hover').animate({'opacity': '0', 'top': '37%'}, 500);
                                            $('.hover-right').stop().animate({ marginTop: 20 }, 500);
                                            $('.hover h2').stop().animate({ marginTop: 20 }, 500);
                                         
                                    })
                                    .on('click', function (e) {
                                        e.preventDefault();
                                        if ($('#project').is(':visible')){
                                             $('#project').load('assets/html/' + $(e.currentTarget).data('id') + '.html', function(){
                                                $(this).append('<a href="#" title="close" class="close-project">close</a>');
                                                $('.close-project').on('click', function (e){
                                                  $('#project').slideUp('slow');
                                                  $('.header').animate({ 'height': '150px' }, 500);
                                                  $('#projects ul.wrap').animate({'opacity': '1'}, 500);
                                                  $(".section").animate({ marginTop: '170px' }, 500);
                                              });
                                             });

                                            return;
                                        }
                                        $('#project').slideUp('fast', function () {
                                            
                                            console.log($(e.currentTarget));

                                            $('#project').load('assets/html/' + $(e.currentTarget).data('id') + '.html', function () {
                                                $('.content .title').text((pos === 0 ? 'Recent projects - ' : 'Past projects - ') + $('#project h1:eq(0)').text());
                                                $(this).slideDown('slow');
                                                $(this).append('<a href="#" title="close" class="close-project">close</a>');
                                                $('.close-project').on('click', function (e){
                                                $('#project').slideUp('slow');
                                                  $('.header').animate({ 'height': '150px' }, 500);
                                                  $('#container').animate({'top': '0px' }, 500);  
                                                  $('#projects ul.wrap').animate({'opacity': '1'}, 500);
                                                  $('.footer').removeClass('open');
                                                  $(".section").animate({ marginTop: '170px' }, 500);

                                                })
                                            })
                                        });

                                    })
                                    .find('img').on('load', function () {
                                        var total;
                                        if (pos === maxPos - 1) {
                                            total = pages.length - pos * 6;
                                        } else {
                                            total = 6;
                                        }

                                        loadCount++;
                                        if (loadCount === total) {
                                            removeLoading('#projects');
                                        }
                                    });

                            }
                        }
                        attachLoading('.wrap');
                    }
                   
            
                    //create prev and next and disable them
                    $('.media-box .prev').on('click', function () {
                            $('ul.wrap').hide();
                             if (pos === 0) {
                                return;
                            }
                            if (pos > 0) {
                                pos--;
                            } 
                            $('ul.wrap').fadeIn(500);
                            show(pos);
                            if ($('#project').is(':hidden')){
                            $('#project').slideUp('slow'); 
                            }
                   
                    });

                    $('.media-box .next').on('click', function () {
                            $('ul.wrap').hide();
                             if (pos === maxPos) {
                                return;
                            }
                            if (pos < maxPos) {
                                pos++;
                            }
                            $('ul.wrap').fadeIn(500);
                            show(pos);
                            if ($('#project').is(':hidden')){
                            $('#project').slideUp('slow'); 
                            }

                    });
            
                    
                    //create a pagination
                            for (var i = 0; i < maxPos; i++) {
                                $("#tabmenunav").append("<a href='#' class=''>&#8226;</a>");
                            }
                            $("#tabmenunav a").on('click', function (e) {
                                show($(this).index());
                            });

                            show(pos);

                    // Ajaxing the portfolio
                   function opernerPortfolio () {
                            $('#projects a.img-project').live('click', function(event){
                            event.preventDefault();
                            var position = $('#project').position();
                            $("html, body").animate({ scrollTop: 0 }, 500);
                            $(".section").animate({ marginTop: '0' }, 500);
                            $('.header').animate({ 'height': 0 }, 500);
                            $('.footer').removeClass('open');
                            $('#projects ul.wrap').animate({'opacity': '0.7'});
                            })
                    }

                    //Slide the more images on project
                    function slideImages(){
                        
                            $('.image-portfolio img:gt(0)').hide();
                            setInterval(function(){
                                if ($('.image-portfolio img').length <= 1) {
                                    return;
                                }
                            $('.image-portfolio :first-child')
                            .fadeOut()
                            .next('img')
                            .fadeIn()
                            .end()
                            .appendTo('.image-portfolio');
                        },3000);
                    }

                    function openFooter(){
                        $('a.toggle-footer').on('click', function (){
                        $('.toggle-footer').toggleClass('open');
                        $('.socials').toggleClass('open');
                        });

                    }

    return {
        init: init
    }        
}();


$(document).ready(function(){
    PortfolioDD.init();


    Modernizr && (!Modernizr.canvas || !Modernizr.csstransitions || !Modernizr.opacity || !Modernizr.rgba) && 
    $(".shitbrowser").removeClass("hidden");
 
 
  
 



});
        