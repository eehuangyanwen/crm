import abc from "../api/UserApi"
export default {
    promise_api: function () {
        return new Promise(function (resolve, reject) {
            abc.Logout("1234").then(Response => {
                let res = Response.data;
                if (res.code == "200") {
                    resolve(res);
                } else if (res.code == "300") {
                    reject("error");
                } else throw "\nhello\n";
            });
        })
            .then(
                function (res) {
                    console.log(res);
                },
                function (res) {
                    console.log(res);
                }
            )
            .catch(res => { console.log(res); })
    }
}
