import emojify from './components/emoji'

$(() => {
  $.each($('.emojify'), (_, content) => {
    const $content = $(content);
    $content.html(emojify($content.html()));
  });

  $('.video-player video').on('click', e => {
    if (e.target.paused) {
      e.target.play();
    } else {
      e.target.pause();
    }
  });

  $('.media-spoiler').on('click', e => {
    $(e.target).hide();
  });

  $('.webapp-btn').on('click', e => {
    if (e.button === 0) {
      e.preventDefault();
      window.location.href = $(e.target).attr('href');
    }
  });

  $('.status__content__spoiler-link').on('click', e => {
    e.preventDefault();
    const contentEl = $(e.target).parent().parent().find('div');

    if (contentEl.is(':visible')) {
      contentEl.hide();
      $(e.target).parent().attr('style', 'margin-bottom: 0');
    } else {
      contentEl.show();
      $(e.target).parent().attr('style', null);
    }
  });
});
