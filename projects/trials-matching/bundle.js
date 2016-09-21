(function() {
  function loadUserProgress() {
    pybossa.userProgress('opentrials-trials-matching').done(function(data){
      var pct = Math.round((data.done*100)/data.total);
      $("#progress").css("width", pct.toString() +"%");
      $("#progress").attr("title", pct.toString() + "% completed!");
      $("#progress").tooltip({'placement': 'left'}); 
      $("#total").text(data.total);
      $("#done").text(data.done);
    });
  }

  function getUsername() {
    var userCookie = Cookies.getJSON('remember_token');
    var username;

    if (typeof userCookie !== 'undefined') {
      username = userCookie.split('|')[0];
    }

    return username;
  }

  function generateUrl(trial_id) {
    return 'http://explorer.opentrials.net/trials/' + trial_id;
  }

  pybossa.taskLoaded(function(task, deferred){
    if (!$.isEmptyObject(task)) {
      var taskHtml = (
        '<ul>' +
            '<li><a href="{trial1_url}" target="_blank">{trial1_url}</a></li>' +
            '<li><a href="{trial2_url}" target="_blank">{trial2_url}</a></li>' +
        '</ul>'
      ).replace(/{trial1_url}/g, generateUrl(task.info.trial1_id))
       .replace(/{trial2_url}/g, generateUrl(task.info.trial2_id));

      task.info.html = taskHtml;
    }

    deferred.resolve(task);
  });

  pybossa.presentTask(function(task, deferred){
    if ($.isEmptyObject(task)) {
      $('#finish').fadeIn();
      return;
    }

    loadUserProgress();
    $('#tasks').html(task.info.html);

    $('button[name="result"]').unbind('click').click(function () {
      var answer = {
        username: getUsername(),
        info: task.info,
        value: $(this).attr('value'),
      };

      pybossa.saveTask(task.id, answer).done(function(data){
        deferred.resolve();
        $("#success").fadeIn();
        setTimeout(function() { $("#success").fadeOut() }, 2000);
      })

      return false;
    });
  });

  pybossa.run('opentrials-trials-matching');
})();
