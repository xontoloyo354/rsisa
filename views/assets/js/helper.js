const processDelete = url => {
  return swal({
    title: 'Apakah kamu yakin ingin menghapus data ini',
    text: '',
    type: 'warning',
    buttons: {
      cancel: {
        visible: true,
        text: 'Batal',
        className: 'btn btn-danger',
      },
      confirm: {
        text: 'Hapus',
        className: 'btn btn-success',
      },
    },
  })
    .then(async willDelete => {
      if (!willDelete) {
        throw new Error('error');
        // return swal('Hapus data dibatalkan', {
        //   buttons: {
        //     confirm: {
        //       className: 'btn btn-success',
        //     },
        //   },
        // });
      } else {
        return axios
          .get(url)
          .then(res => {
            swal({
              icon: 'success',
            });
          })
          .catch(err => {
            swal({
              icon: 'error',
            });
            throw new Error('gagal');
          });
      }
    })
    .catch(err => {
      swal({
        icon: 'error',
      });
      throw new Error('gagal');
    });
};
const showMessage = (type, title, message) => {
  $('#exampleModalCenter').modal('hide');
  var style = 'withicon';
  var content = {};

  content.title = title;
  content.message = message;
  if (style == 'withicon') {
    content.icon = 'fa fa-bell';
  } else {
    content.icon = 'none';
  }

  $.notify(content, {
    type,
    placement: {
      from: 'top',
      align: 'right',
    },
    time: 1000,
    delay: 0,
  });
};
const numberFormat = number => {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  // return new Intl.NumberFormat('IDR-ID', {
  //   style: 'currency',
  //   currency: 'IDR',
  // }).format(number);
};
