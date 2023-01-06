        static string MD5(string strin)
        {
            byte[] outval;
            //string retval = "";
            StringBuilder builder = new StringBuilder();

            System.Security.Cryptography.MD5 md5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
            outval = md5.ComputeHash(Encoding.Unicode.GetBytes(strin));

            builder.Append(outval[0].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[1].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[2].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[3].ToString("X").PadLeft(2, '0'));
            builder.Append("-");
            builder.Append(outval[4].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[5].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[6].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[7].ToString("X").PadLeft(2, '0'));
            builder.Append("-");
            builder.Append(outval[8].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[9].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[10].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[11].ToString("X").PadLeft(2, '0'));
            builder.Append("-");
            builder.Append(outval[12].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[13].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[14].ToString("X").PadLeft(2, '0'));
            builder.Append(outval[15].ToString("X").PadLeft(2, '0'));

           /* retval += outval[0].ToString("X").PadLeft(2, '0');
            retval += outval[1].ToString("X").PadLeft(2, '0');
            retval += outval[2].ToString("X").PadLeft(2, '0');
            retval += outval[3].ToString("X").PadLeft(2, '0');
            retval += "-";
            retval += outval[4].ToString("X").PadLeft(2, '0');
            retval += outval[5].ToString("X").PadLeft(2, '0');
            retval += outval[6].ToString("X").PadLeft(2, '0');
            retval += outval[7].ToString("X").PadLeft(2, '0');
            retval += "-";
            retval += outval[8].ToString("X").PadLeft(2, '0');
            retval += outval[9].ToString("X").PadLeft(2, '0');
            retval += outval[10].ToString("X").PadLeft(2, '0');
            retval += outval[11].ToString("X").PadLeft(2, '0');
            retval += "-";
            retval += outval[12].ToString("X").PadLeft(2, '0');
            retval += outval[13].ToString("X").PadLeft(2, '0');
            retval += outval[14].ToString("X").PadLeft(2, '0');
            retval += outval[15].ToString("X").PadLeft(2, '0');

            return retval;*/
            return builder.ToString();
        }