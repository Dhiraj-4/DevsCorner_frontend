import { create } from 'zustand';
export const useAuthStore = create((set) => ({
    accessToken: '',
    setAccessToken: (token) => set({ accessToken: token }),

    identifier: '',
    setIdentifier: (identifier) => set({ identifier }),
    
    password: '',
    setPassword: (passwd) => set({ password: passwd }),

    passwordShow: false,
    setPasswordShow: (bool) => set({ passwordShow: bool }),

    isLoading: false,
    setIsLoading: (bool) => set({ isLoading: bool }),

    fullName: '',
    setFullName: (name) => set({ fullName: name }),

    userName: '',
    setUserName: (usrName) => set({ userName: usrName }),

    email: '',
    setEmail: (mail) => set({ email: mail }),

    newPassword: '',
    setNewPassword: (passwd) => set({ newPassword: passwd }),

    newPasswordShow: false,
    setNewPasswordShow: (bool) => set({ newPasswordShow: bool }),

    confirmPassword: '',
    setConfirmPassword: (passwd) => set({ confirmPassword: passwd }),

    confirmPasswordShow: false,
    setConfirmPasswordShow: (bool) => set({ confirmPasswordShow: bool }),

    resending: false,
    setResending: (bool) => set({ resending: bool }),

    otp: '',
    setOtp: (otp) => set({ otp: otp }),

    otpVerificationToken: '',
    setOtpVerificationToken: (token) => set({ otpVerificationToken: token }),

    passwordResetToken: '',
    setPasswordResetToken: (token) => set({ passwordResetToken: token }),

    error: null,
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
    
    // Reset signup and clear errors
    reset_authStore: () => set({
      fullName: '',
      userName: '',
      identifier: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      password: '',
      accessToken: '',
      isPasswordMatch: true,
      isLoading: false,
      resending: false,
      otp: '',
      otpVerificationToken: '',
      passwordResetToken: '',
      error: null
    })
})
);