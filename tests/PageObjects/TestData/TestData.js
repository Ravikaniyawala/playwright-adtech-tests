class testData
    /** test data for Request, response verification per test case id in the following confluence document
     * example
     * IHTWEB_00x_001_HTTPMETHOD
     * IHTWEB_00x_001_URL
     * IHTWEB_00x_001_PARAM
     * IHTWEB_00x_001_PAYLOAD
     * IHTWEB_00x_001_STATUSCODE*/
{
//-----------------------------------------------------------------------iHeart Request Response Test Data----------------------------------------------------------------

    IHTWEB_001_001_HTTPMETHOD = "POST";
    IHTWEB_001_001_URL = "https://www.xyz.net/6/data";
    IHTWEB_001_001_PAYLOAD = ["Page View : home","_cc_id"];
    IHTWEB_001_001_STATUSCODE = 200;
    IHTWEB_001_002_HTTPMETHOD = "GET";
    IHTWEB_001_002_URL = "https://www.abcd.net/lt/shared/";
    IHTWEB_001_002_PARAM = ['c=0000'];
    IHTWEB_001_002_STATUSCODE = 200;

    IHTWEB_002_HTTPMETHOD = "";
    IHTWEB_002_URL = "";
    IHTWEB_002_PARAM = '';
    IHTWEB_002_STATUSCODE = "";

}

export default new testData();