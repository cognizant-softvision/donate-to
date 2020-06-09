window.onload = function () {
  this.hrefRedirect = "";
  $(".client-list_delete-link").click((evt) => {
    evt.preventDefault();
    $("#client-list_delete-modal").modal("show");
    this.hrefRedirect = evt.target.href;
    return false;
  });

  $(".client-list_confirm-delete").click((evt) => {
    evt.preventDefault();
    $.get(this.hrefRedirect);
    window.location.reload(true);
    return false;
  });
};
