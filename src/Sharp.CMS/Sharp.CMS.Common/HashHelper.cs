﻿using System;
using System.Security.Cryptography;
using System.Text;

namespace Sharp.CMS.Common
{
    public class HashHelper
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="hashpassword"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        // ReSharper disable once InconsistentNaming
        public static string CreateHashSHA512(string hashpassword, string salt)
        {
            string saltAndPwd = String.Concat(hashpassword, salt);
            var bytes = System.Text.Encoding.UTF8.GetBytes(saltAndPwd);
            using var hash = System.Security.Cryptography.SHA512.Create();
            var hashedInputBytes = hash.ComputeHash(bytes);
            var hashedInputStringBuilder = new System.Text.StringBuilder(128);
            foreach (var b in hashedInputBytes)
            {
                hashedInputStringBuilder.Append(b.ToString("X2"));
            }

            return hashedInputStringBuilder.ToString();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="rawData"></param>
        /// <returns></returns>
        // ReSharper disable once InconsistentNaming
        public static string CreateHashSHA256(string rawData)
        {
            // Create a SHA256   
            using SHA256 sha256Hash = SHA256.Create();
            // ComputeHash - returns byte array  
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

            // Convert byte array to a string   
            StringBuilder builder = new StringBuilder();
            foreach (var t in bytes)
            {
                builder.Append(t.ToString("x2"));
            }

            return builder.ToString();
        }


        public static string CreateHashMd5(string rawData)
        {
            using System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(rawData);
            byte[] hashBytes = md5.ComputeHash(inputBytes);

            // Convert the byte array to hexadecimal string
            StringBuilder sb = new StringBuilder();
            foreach (var t in hashBytes)
            {
                sb.Append(t.ToString("X2"));
            }
            return sb.ToString();
        }
    }
}