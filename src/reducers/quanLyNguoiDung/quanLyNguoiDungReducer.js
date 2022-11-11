import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { quanLyNguoiDungService } from "../../services/quanLyNguoiDungService"

const initialState = {
    userLogin: null, isFetchingUser: false, errUserLogin: undefined,
    userRegister: null, isFetchingUserRegister: false, errUserRegister: undefined,
    userInfo: null, isFetchingUserInfo: false,
    userList: null, isFetchingUserList: false,
    addUser: null, isFetchingAddUser: false, errAddUser: undefined,
    deleteUser: null, isFetchingdeleteUser: false, errDeleteUser: undefined,
    getUserInfo: null, isFetchingGetUserInfo: false,
    updateUserInfo: null, isFetchingUpdateUserInfo: false, errUpdateUserInfo: undefined,
    userSearch: null, isFetchingUserSearch: false,
    userType: null, isFetchingUserType: false,

}

export const { reducer: quanLyNguoiDungReducer, action: quanLyNguoiDungActions } = createSlice({
    name: 'quanLyNguoiDung',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.userLogin = null
            state.userRegister = null
            localStorage.removeItem("USER_LOGIN")
            localStorage.removeItem("ACCESS_TOKEN")
        },
        login: (state, action) => {
            state.errUserLogin = undefined
        },
        register: (state, action) => {
            state.errUserRegister = undefined
        },
        addUser: (state, action) => {
            state.errAddUser = undefined
            state.addUser = null
        },
        updateUser: (state, action) => {
            state.errUpdateUserInfo = undefined
            state.updateUserInfo = null
        },
        deleteUser: (state, action) => {
            state.errDeleteUser = undefined
            state.deleteUser = null
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginAction.pending, (state, action) => {
                state.isFetchingUser = true
            }).addCase(loginAction.fulfilled, (state, action) => {
                state.isFetchingUser = false
                state.userLogin = action.payload
                localStorage.setItem("USER_LOGIN", JSON.stringify(action.payload))
                localStorage.setItem("ACCESS_TOKEN", JSON.stringify(action.payload.accessToken))
            }).addCase(loginAction.rejected, (state, action) => {
                state.isFetchingUser = false
                state.userLogin = action.payload
            })
            // register
            .addCase(registerAction.pending, (state, action) => {
                state.isFetchingUserRegister = true
            }).addCase(registerAction.fulfilled, (state, action) => {
                state.isFetchingUserRegister = false
                state.userRegister = action.payload
            }).addCase(registerAction.rejected, (state, action) => {
                state.isFetchingUserRegister = false
                state.userRegister = action.payload
            })
            // account info
            .addCase(userInfoAction.pending, (state, action) => {
                state.isFetchingUserInfo = true
            }).addCase(userInfoAction.fulfilled, (state, action) => {
                state.isFetchingUserInfo = false
                state.userInfo = action.payload
            }).addCase(userInfoAction.rejected, (state, action) => {
                state.isFetchingUserInfo = false
                state.userInfo = action.payload
            })
            // get user list
            .addCase(getUserListAction.pending, (state, action) => {
                state.isFetchingUserList = true
            }).addCase(getUserListAction.fulfilled, (state, action) => {
                state.isFetchingUserList = false
                state.userList = action.payload
            }).addCase(getUserListAction.rejected, (state, action) => {
                state.isFetchingUserList = false
                state.userList = action.payload
            })
            // add user
            .addCase(addUserAction.pending, (state, action) => {
                state.isFetchingAddUser = true
            }).addCase(addUserAction.fulfilled, (state, action) => {
                state.isFetchingAddUser = false
                state.addUser = action.payload
            }).addCase(addUserAction.rejected, (state, action) => {
                state.isFetchingAddUser = false
                state.addUser = action.payload
            })
            // delete user
            .addCase(deleteUserAction.pending, (state, action) => {
                state.isFetchingdeleteUser = true
            }).addCase(deleteUserAction.fulfilled, (state, action) => {
                state.isFetchingdeleteUser = false
                state.deleteUser = action.payload
            }).addCase(deleteUserAction.rejected, (state, action) => {
                state.isFetchingdeleteUser = false
                state.deleteUser = action.payload
            })
            // get user info
            .addCase(getUserInfoAction.pending, (state, action) => {
                state.isFetchingGetUserInfo = true
            }).addCase(getUserInfoAction.fulfilled, (state, action) => {
                state.isFetchingGetUserInfo = false
                state.getUserInfo = action.payload
            }).addCase(getUserInfoAction.rejected, (state, action) => {
                state.isFetchingGetUserInfo = false
                state.getUserInfo = action.payload
            })
            // update user info
            .addCase(updateUserInfoAction.pending, (state, action) => {
                state.isFetchingUpdateUserInfo = true
            }).addCase(updateUserInfoAction.fulfilled, (state, action) => {
                state.isFetchingUpdateUserInfo = false
                state.updateUserInfo = action.payload
            }).addCase(updateUserInfoAction.rejected, (state, action) => {
                state.isFetchingUpdateUserInfo = false
                state.updateUserInfo = action.payload
            })
    }
})

export const loginAction = createAsyncThunk(
    "QuanLyNguoiDung/dangNhap",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyNguoiDungService.login(data);
            localStorage.setItem("USER_LOGIN", JSON.stringify(result.data.content))
            localStorage.setItem("ACCESS_TOKEN", JSON.stringify(result.data.content.accessToken))
            // console.log(result.data.content)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    },
);

export const registerAction = createAsyncThunk(
    "QuanLyNguoiDung/DangKy",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyNguoiDungService.register(data)
            console.log(result.data.content)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const userInfoAction = createAsyncThunk(
    "QuanLyNguoiDung/ThongTinTaiKhoan",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyNguoiDungService.information()
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUserListAction = createAsyncThunk(
    "QuanLyNguoiDung/LayDanhSachNguoiDung",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyNguoiDungService.getUserList(data)
            console.log("layDanhSachNguoiDung", result.data.content);
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addUserAction = createAsyncThunk(
    "QuanLyNguoiDung/ThemNguoiDung",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyNguoiDungService.addUser(data)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteUserAction = createAsyncThunk(
    "QuanLyNguoiDung/XoaNguoiDung",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyNguoiDungService.deleteUser(data)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUserInfoAction = createAsyncThunk(
    "QuanLyNguoiDung/LayThongTinNguoiDung",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyNguoiDungService.getUserInfo(data)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateUserInfoAction = createAsyncThunk(
    "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    async (data, { rejectWithValue }) => {
        try {
            const result = await quanLyNguoiDungService.updateUserInfo(data)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)