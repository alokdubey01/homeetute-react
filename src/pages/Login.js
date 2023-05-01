import React, { useEffect, useState } from 'react'
import useAuth from '../HOC/AuthContext'
import { auth } from '../firebase'
import db from '../firebase'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import flag from '../images/india.png'
import OTPInput, { ResendOTP } from 'otp-input-react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function Login() {
  const [mobileError, setMobileError] = useState("")
  const [otpError, setOtpError] = useState("")
  const [otpResend, setOtpResend] = useState(false)
  const [otpResendError, setOtpResendError] = useState(false)
  const [otpSuccess, setOtpSuccess] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [newUser, setNewUser] = useState(false)

  const navigate = useNavigate()

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            sendOtp();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }

  function sendOtp() {
    if (mobile.length !== 10) {
      setMobileError(true);
      return;
    }
    onCaptchVerify();
    setLoading(true);
    signInWithPhoneNumber(auth, "+91" + mobile, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        setMobileError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function verifyOtp() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const existing_uid = result._tokenResponse.isNewUser;
        localStorage.setItem('userId', result.user.uid)
        if (existing_uid === false) {
          setNewUser(false);
          setLoading(false);
          navigate('/home')
        } else {
          setNewUser(true);
          setLoading(false);
          setDoc(doc(db, "students", result.user.uid), {
            uid: result.user.uid,
            mobile: mobile,
            role: "student",
          })
            .then(() => {
              console.log("Document successfully written!");
              navigate('/register');
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
              // window.location.reload();
            });
        }
        setOtpSuccess(true);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function resendOtp() {
    setLoading(true);
    signInWithPhoneNumber(auth, "+91" + mobile, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpResend(true);
        setMobileError(false);
        setOtpError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setOtpResendError(true);
      });
  }

  return (
    <div>
      <div id="recaptcha-container"></div>
      <div className="bg-white justify-center w-1/2 md:w-96 md:mt-32 my-auto mx-auto rounded-xl">
        <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
        {mobileError && ( // Mobile number error message block starts here
          <div className="flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden bg-red-50 border-red-600">
            <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full bg-red-600 text-red-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
            </span>
            <div className="flex-1 p-2">
              <p className="text-sm text-gray-800">
                Please enter a valid mobile number
              </p>
            </div>
            <button type="button" className="ml-6 p-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        )}
        {otpSent && ( // OTP sent message block starts here
          <div className="flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden bg-green-50 border-green-600">
            <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full bg-green-600 text-green-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
            </span>
            <div className="flex-1 p-2">
              <p className="text-sm text-gray-800">
                OTP sent to {mobile}
              </p>
            </div>
            <button type="button" className="ml-6 p-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        )}
        {otpError && ( // OTP error message block starts here
          <div className="flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden bg-red-50 border-red-600">
            <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full bg-red-600 text-red-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
            </span>
            <div className="flex-1 p-2">
              <p className="text-sm text-gray-800">
                Please enter a valid OTP
              </p>
            </div>
            <button type="button" className="ml-6 p-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        )}
        {otpSuccess && ( // OTP success message block starts here
          <div className="flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden bg-green-50 border-green-600">
            <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full bg-green-600 text-green-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
            </span>
            <div className="flex-1 p-2">
              <p className="text-sm text-gray-800">
                OTP verified successfully
              </p>
            </div>
            <button type="button" className="ml-6 p-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        )}
        {otpResend && ( // OTP resend message block starts here
          <div className="flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden bg-green-50 border-green-600">
            <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full bg-green-600 text-green-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
            </span>
            <div className="flex-1 p-2">
              <p className="text-sm text-gray-800">
                OTP resent successfully
              </p>
            </div>
            <button type="button" className="ml-6 p-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        )}
        {otpResendError && ( // OTP resend error message block starts here
          <div className="flex flex-row pl-4 py-2 gap-2 items-center border rounded-lg shadow overflow-hidden bg-red-50 border-red-600">
            <span className="flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none rounded-full bg-red-600 text-red-50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
            </span>
            <div className="flex-1 p-2">
              <p className="text-sm text-gray-800">
                OTP resend failed
              </p>
            </div>
            <button type="button" className="ml-6 p-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        )}

        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-8">
            <h1 className="my-3 text-xl font-semibold">Let's start now</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              We'll send you a one-time-password (OTP) to your mobile number.
            </p>
          </div>
          <form
            action=""
            className="space-y-12 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium"
                >
                  Mobile Number
                </label>
                <div className="flex items-center">
                  <div className="resize-none flex gap-1 items-center p-2 px-4 pr-6 bg-slate-50 border border-gray-200 focus:outline-none focus:ring-indigo-600 focus:ring-2 text-sm font-medium leading-none text-gray-800">
                    <img
                      src={flag}
                      alt="india"
                      width={19}
                      height={19}
                      className="block"
                    />
                    +91
                  </div>
                  <input
                    type="number"
                    name="mobile"
                    id="mobile"
                    maxLength={10}
                    value={mobile}
                    autoFocus
                    rows={1}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full resize-none p-2 bg-white border border-gray-200 focus:outline-indigo-600 focus:outline-2 text-sm font-medium leading-none text-gray-800 read-only:bg-slate-300"
                  />
                </div>
              </div>
              <div className={otpSent ? "block" : "hidden"}>
                <div className="flex justify-between mb-2">
                  <label htmlFor="otp" className="text-sm font-medium">
                    OTP(One Time Password)
                  </label>
                </div>
                <OTPInput inputClassName="bg-white border border-gray-200 focus:outline-indigo-600 focus:outline-2 text-sm font-medium leading-nonef text-gray-800 read-only:bg-slate-300" value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
                <ResendOTP className="mt-2" maxTime={30} onResendClick={resendOtp} />
              </div>
            </div>
            {!otpSent ? (
              <div>
                {loading ? (
                  <div>
                    <button
                      type="button"
                      className="w-full bg-[#7781f3] text-white rounded-full px-8 py-3 font-semibold uppercase text-sm dark:bg-violet-400 dark:text-gray-900 duration-[500ms,800ms]"
                      disabled
                    >
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                        <div className="ml-2">Sending...</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={sendOtp}
                    type="button"
                    className="w-full cursor-pointer bg-[#525fe1] text-white rounded-full px-8 py-3 font-semibold uppercase text-sm dark:bg-violet-400 dark:text-gray-900"
                  >
                    Send OTP
                  </button>
                )}
              </div>
            ) : (
              <div>
                {loading ? (
                  <div>
                    <button
                      type="button"
                      className="w-full bg-[#7781f3] text-white rounded-full px-8 py-3 font-semibold uppercase text-sm dark:bg-violet-400 dark:text-gray-900 duration-[500ms,800ms]"
                      disabled
                    >
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                        <div className="ml-2">Verifing...</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="w-full bg-[#525fe1] text-white rounded-full px-8 py-3 font-semibold uppercase text-sm dark:bg-violet-400 dark:text-gray-900"
                  >
                    Verify OTP
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
