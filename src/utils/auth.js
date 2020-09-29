const TOKEN_KEY='mxg-token'
const USER_KEY='mxg-user'

export default{
    get_token(){
        return localStorage.getItem(TOKEN_KEY)
    },
    set_token(token){
        localStorage.setItem(TOKEN_KEY,token)
    },
    remove_token(){
        localStorage.removeItem(TOKEN_KEY)
    },
    get_user_info(){
        return JSON.parse(localStorage.getItem(USER_KEY))
    },
    set_user_info(user){
        localStorage.setItem(USER_KEY,JSON.stringify(user))
    },
    remove_user_info(){
        localStorage.removeItem(USER_KEY)
    }

}