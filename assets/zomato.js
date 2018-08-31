var accessToken = '6816158a6fbe7ceacf3a9617a5853775';

$.ajax({
    // url: 'https://developers.zomato.com/api/v2.1/categories',
    url: 'https://developers.zomato.com/api/v2.1/cities?q=washington',
    headers: {
        'user-key': accessToken,
    },
    success: function (response) {
        console.log(response);
    }
})