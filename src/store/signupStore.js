import { create } from "zustand";

export const useSignupStore = create((set,get) => ({
    fullName: '',
    setFullName: (name) => set({ fullName: name }),

    userName: '',
    setUserName: (usrName) => set({ userName: usrName }),

    email: '',
    setEmail: (mail) => set({ email: mail }),

    role: '',
    setRole: (role) => set({ role: role }),

    newPassword: '',
    setNewPassword: (passwd) => set({ newPassword: passwd }),

    newPasswordShow: false,
    setNewPasswordShow: (bool) => set({ newPasswordShow: bool }),

    confirmPassword: '',
    setConfirmPassword: (passwd) => set({ confirmPassword: passwd }),

    confirmPasswordShow: false,
    setConfirmPasswordShow: (bool) => set({ confirmPasswordShow: bool }),

    isLoading: false,
    setIsLoading: (bool) => set({ isLoading: bool }),

    resending: false,
    setResending: (bool) => set({ resending: bool }),

    otp: '',
    setOtp: (otp) => set({ otp: otp }),

    otpVerificationToken: '',
    setOtpVerificationToken: (token) => set({ otpVerificationToken: token }),

    error: null,
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
    
    // Reset signup and clear errors
    reset_signup: () => set({
      fullName: '',
      userName: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      role: '',
      isPasswordMatch: true,
      isLoading: false,
      resending: false,
      otp: '',
      otpVerificationToken: '',
      error: null
    })
}))