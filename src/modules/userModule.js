import { ref } from 'vue'
import auth from '../store/auth';
import router from '../router/index';
import jwt_decode from 'jwt-decode';

const getUsers = () => {

    const state = ref({

        // Login process
        user: [],
        name: '',
        username: '',       //Username
        password: '',       //password
        show_error_username: '',  //Show error if empty or wrong username
        show_error_password: '',  //Show error if empty or wrong password
        show_main_error: '',  //Show errors like: dont have accout,...

        //Register process
        confirm_password: '',


        //Homepage
        nameAccHomePage: '',
        nameHomePage: '',

        test: "ok",

    })


    //Register new user
    const register = async () => {
        if (state.value.password !== state.value.confirm_password) {
            state.value.show_error_password = 'Mật khẩu không trùng khớp';
        } else if (state.value.password === '' || state.value.name === '' || state.value.username === '' || state.value.confirm_password === '') {
            state.value.show_main_error = 'Hãy nhập đủ thông tin';
        } else if (state.value.password.length < 4 || state.value.password.length > 20) {
            state.value.show_error_password = 'Độ dài mật khẩu >= 4 và <= 20';
        } else {
            state.value.show_main_error = '';
            state.value.show_error_password = '';

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: state.value.name,
                    username: state.value.username,
                    password: state.value.password,
                })
            };

            try {
                const response = await fetch('http://localhost:3000/users/register/', requestOptions);

                if (response.ok) {
                    // Yêu cầu đăng ký thành công, làm gì đó nếu cần

                    // Reset input fields
                    state.value.name = '';
                    state.value.username = '';
                    state.value.password = '';
                    state.value.confirm_password = '';
                    state.value.show_error_username = '';
                    state.value.show_main_error = 'Bạn đã đăng ký thành công hãy quay lại trang đăng nhập'
                } else {
                    state.value.show_error_username = 'Username này đã tồn tại';
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    //Login
    const login = async () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: state.value.username,
                password: state.value.password,
            })
        };

        await fetch('http://localhost:3000/users/login/', requestOptions);

        try{
            const response = await fetch('http://localhost:3000/users/login/',requestOptions);

            if(response.ok){
                //save data of user
                const data = await response.json();
                console.log(data)

                localStorage.setItem('token', data.token);

                state.value.username = '';
                state.value.password = '';
                state.value.show_main_error = 'Đăng nhập thành công'; 

                auth.setIsLoggedIn(true);

                router.push({ name: 'home' });

            }else{
                const data = await response.json();
                state.value.show_main_error = data.message
            }
        }catch(error){
            console.error('Error:', error);
        }

    }

    //Logout
    const logOut = () => {
        localStorage.removeItem('token');
        console.log("was logout")
    }

    const setNameHomePage = async () => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
          try {
            const decodedToken = jwt_decode(token); // Giải mã token bằng thư viện jwt_decode
            state.value.nameAccHomePage = decodedToken.username; // Trích xuất tên người dùng từ decoded token
            state.value.nameHomePage = decodedToken.name;
          } catch (error) {
            console.error('Lỗi giải mã token:', error);
          }
        } else {
          console.error('Không tìm thấy token trong localStorage');
        }
      };

    return {
        state,
        register,
        login,
        logOut,
        setNameHomePage
    }

}

export default getUsers