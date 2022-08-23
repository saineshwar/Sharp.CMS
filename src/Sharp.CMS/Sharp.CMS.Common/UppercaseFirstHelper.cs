namespace Sharp.CMS.Common
{
    public static class UppercaseFirstHelper
    {
        public static string UppercaseFirst(string s)
        {
            // Check for empty string.
            if (string.IsNullOrEmpty(s))
            {
                return string.Empty;
            }

            var trim = s.Trim();
            // Return char and concat substring.
            return char.ToUpper(trim[0]) + trim.Substring(1);
        }
    }
}