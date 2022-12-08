// Notice For List
const noticeForList = [
    {
        id: 1,
        name: 'Service Provider',
        name_bn: 'সার্ভিস প্রদানকারী'
    },
    {
        id: 2,
        name: 'Service Receiver',
        name_bn: 'সার্ভিস গ্রহণকারী'
    }
]

// Status List
const statusList = [
    {
        id: 0,
        name: 'Pending',
        name_bn: 'বিচারাধীন'
    },
    {
        id: 1,
        name: 'Processing',
        name_bn: 'প্রক্রিয়াজাতকরণ'
    },
    {
        id: 2,
        name: 'Presented',
        name_bn: 'উপস্থাপিত'
    },
    {
        id: 3,
        name: 'Rejected',
        name_bn: 'প্রত্যাখ্যাত'
    },
    {
        id: 4,
        name: 'Solved',
        name_bn: 'সমাধান হয়েছে'
    },
    {
        id: 5,
        name: 'Appealed',
        name_bn: 'আপিল করা হয়েছে'
    },
    {
        id: 6,
        name: 'Sent',
        name_bn: 'প্রেরণ করা হয়েছে'
    }
]
// Refundby List
const refundByList = [
    {
        id: 1,
        name: 'Bkash',
        name_bn: 'বিকাশ'
    },
    {
        id: 2,
        name: 'Rocket',
        name_bn: 'রকেট'
    },
    {
        id: 3,
        name: 'Bank',
        name_bn: 'ব্যাংক'
    },
    {
        id: 4,
        name: 'Cash',
        name_bn: 'নগদ'
    }
]

// Payment Type List
const paymentTypeList = [
    {
        id: 1,
        name: 'Registration Fee',
        name_bn: 'নিবন্ধন ফি'
    },
    {
        id: 2,
        name: 'Renewal Fee',
        name_bn: 'নবায়ন ফি'
    },
    {
        id: 3,
        name: 'Test 1',
        name_bn: 'Test 1'
    },
    {
        id: 4,
        name: 'Test 2',
        name_bn: 'Test 2'
    },
    {
        id: 5,
        name: 'Test 3',
        name_bn: 'Test 3'
    },
    {
        id: 6,
        name: 'Test 4',
        name_bn: 'Test 4'
    }
]
// Report Types List
const reportTypes = [
    {
        value: 1,
        text: 'LLP',
        text_bn: 'এলএলপি'
    },
    {
        value: 2,
        text: 'Deep Tubewell',
        text_bn: 'গভীর নলকূপ'
    },
    {
        value: 3,
        text: 'Final Report',
        text_bn: 'চূড়ান্ত প্রতিবেদন'
    },
    {
        value: 4,
        text: 'Irrigation Machine and Irrigation Areas',
        text_bn: 'সেচযন্ত্র ও সেচ এলাকা'
    }
]
// Form Types List
const formTypes = [
    {
        value: 1,
        text: 'KO',
        text_bn: 'ক'
    },
    {
        value: 2,
        text: 'KHA',
        text_bn: 'খ'
    },
    {
        value: 3,
        text: 'GA',
        text_bn: 'গ'
    },
    {
        value: 4,
        text: 'GHA',
        text_bn: 'ঘ'
    },
    {
        value: 5,
        text: 'UMO',
        text_bn: '‘ঙ’'
    }
]

// Irrigation Task Type List
const irrigationTaskTypeList = [
    {
        text: 'Operator',
        name_bn: 'অপারেটর',
        name: 'Operator',
        value: 1
    },
    {
        text: 'Official',
        name_bn: 'কর্মকর্তা',
        name: 'Official',
        value: 2
    }
]

// Testing Type List
const testingTypeList = [
    {
        id: 1,
        name: 'Drinking Water',
        name_bn: 'খাবার পানি'
    },
    {
        id: 2,
        name: 'Irrigation Water',
        name_bn: 'সেচের পানি'
    },
    {
        id: 3,
        name: 'Industrial Water',
        name_bn: 'শিল্প কারখানার পানি'
    }
]

// Water Testing Status List
const waterTestingStatusList = [
    {
        id: 1,
        name: 'Pending',
        name_bn: 'বিচারাধীন'
    },
    {
        id: 2,
        name: 'Processing',
        name_bn: 'প্রক্রিয়াজাতকরণ'
    },
    {
        id: 3,
        name: 'Send Lab',
        name_bn: 'পরীক্ষাগারে প্রেরণ'
    },
    {
        id: 4,
        name: 'Report Collected',
        name_bn: 'প্রতিবেদন সংগৃহিত'
    },
    {
        id: 5,
        name: 'Reported',
        name_bn: 'রিপোর্টেড'
    },
    {
        id: 6,
        name: 'Rejected',
        name_bn: 'প্রত্যাখ্যাত'
    }
]

// Farmer Smart Card Status List
const smartCardStatusList = [
    {
        id: 1,
        name: 'Pending',
        name_bn: 'বিচারাধীন'
    },
    {
        id: 2,
        name: 'Processing',
        name_bn: 'প্রক্রিয়াজাতকরণ'
    },
    {
        id: 3,
        name: 'Approved',
        name_bn: 'অনুমোদিত'
    },
    {
        id: 4,
        name: 'Generated',
        name_bn: 'স্বয়ংক্রিয়ভাবে প্রস্তুত হয়েছে'
    },
    {
        id: 5,
        name: 'Issued',
        name_bn: 'ইস্যু হয়েছে'
    },
    {
        id: 6,
        name: 'Rejected',
        name_bn: 'প্রত্যাখ্যাত'
    },
    {
        id: 7,
        name: 'Reviewed',
        name_bn: 'পর্যালোচনা'
    }
]
// Farmer Smart Card Status List
const smartCardApplicationTypeList = [
    {
        id: 1,
        name: 'New Application',
        name_bn: 'নতুন আবেদন'
    },
    {
        id: 2,
        name: 'Reissue Application',
        name_bn: 'পুনরায় আবেদন'
    }
]

const maritalStatus = [
    {
        value: 1,
        text: 'Married',
        text_en: 'Married',
        text_bn: 'বিবাহিত'
    },
    {
        value: 2,
        text: 'Single',
        text_en: 'Single',
        text_bn: 'অবিবাহিত'
    },
    {
        value: 3,
        text: 'Divorced',
        text_en: 'Divorced',
        text_bn: 'তালাকপ্রাপ্ত'
    }
]

const genderList = [
    {
        value: 1,
        text: 'Male',
        text_en: 'Male',
        text_bn: 'পুরুষ'
    },
    {
        value: 2,
        text: 'Female',
        text_en: 'Female',
        text_bn: 'মহিলা'
    },
    {
        value: 3,
        text: 'Others',
        text_en: 'Others',
        text_bn: 'অন্যান্য'
    }
]
const genderListEx = [
    {
        value: 1,
        text_en: 'Male',
        text_bn: 'পুরুষ'
    },
    {
        value: 2,
        text_en: 'Female',
        text_bn: 'মহিলা'
    }
]
// payment applicationTypeList
const paymentApplicationTypeList = [
    {
        id: 1,
        name: 'Scheme',
        name_bn: 'স্কিম'
    },
    {
        id: 2,
        name: 'Pump Operator',
        name_bn: 'পাম্পঅপারেটর'
    },
    {
        id: 3,
        name: 'Smart Card',
        name_bn: 'স্মার্ট কার্ড'
    },
    {
        id: 4,
        name: 'Water Testing',
        name_bn: 'জল পরীক্ষা'
    }
]

// payment schemeBADCPaymentType
const paymentSchemeBADCPaymentTypeList = [
    {
        id: 1,
        name: 'Form Fee',
        name_bn: 'ফর্ম ফি'
    },
    {
        id: 2,
        name: 'Participation Fee',
        name_bn: 'অংশগ্রহণ ফি'
    },
    {
        id: 3,
        name: 'Security Money',
        name_bn: 'সুরক্ষা টাকা'
    },
    {
        id: 4,
        name: 'Resunk Fee',
        name_bn: 'মারফত ফি'
    }
]

// payment schemeBMDaPaymentType
const paymentSchemeBMDAPaymentTypeList = [
    {
        id: 1,
        name: 'Form Fee',
        name_bn: 'ফর্ম ফি'
    },
    {
        id: 2,
        name: 'Participation Fee',
        name_bn: 'অংশগ্রহণ ফি'
    },
    {
        id: 3,
        name: 'Resunk Fee',
        name_bn: 'মারফত ফি'
    }
]
const schemePaymentList = [
    {
        id: 1,
        name: 'Participation Fee',
        name_bn: 'অংশগ্রহণ ফি'
    },
    {
        id: 2,
        name: 'Security Money',
        name_bn: 'সুরক্ষা টাকা'
    },
    {
        id: 3,
        name: 'Resunk Fee',
        name_bn: 'মারফত ফি'
    }
]

// payment pump operatin payment type list
const paymetPumpOperationPaymentTypeList = [
    {
        id: 1,
        name: 'Application Fee',
        name_bn: 'আবেদন ফী'
    },
    {
        id: 2,
        name: 'Renew Fee',
        name_bn: 'ফি পুনর্নবীকরণ করুন'
    },
    {
        id: 3,
        name: 'Security Money',
        name_bn: 'সুরক্ষা টাকা'
    }
]

// payment smart card payment type list
const paymetSmartCardPaymentTypeList = [
    {
        id: 1,
        name: 'New',
        name_bn: 'নতুন'
    },
    {
        id: 2,
        name: 'Reissue',
        name_bn: 'পুনঃপ্রকাশ'
    }
]

// payment water testing payment type list
const paymetWaterTestingPaymentTypeList = [
    {
        id: 1,
        name: 'Drinking Water',
        name_bn: 'খাওয়ার পানি'
    },
    {
        id: 2,
        name: 'Irrigation Water',
        name_bn: 'সেচের জল'
    },
    {
        id: 3,
        name: 'Industrial Water',
        name_bn: 'শিল্প জল'
    }
]
const smartCardStatus = [
    {
        id: 1,
        name: 'Pending',
        name_bn: 'বিচারাধীন'
    },
    {
        id: 2,
        name: 'Processing',
        name_bn: 'প্রক্রিয়ারত'
    },
    {
        id: 3,
        name: 'Approved',
        name_bn: 'অনুমোদিত'
    },
    {
        id: 4,
        name: 'Generated',
        name_bn: 'নির্মিত'
    },
    {
        id: 5,
        name: 'Issued',
        name_bn: 'বহির্গত'
    },
    {
        id: 6,
        name: 'Rejected',
        name_bn: 'প্রত্যাখ্যাত'
    },
    {
        id: 7,
        name: 'Reviewed',
        name_bn: 'পর্যালোচিত'
    }
]

const reissueStatus = [
    {
        id: 1,
        name: 'New Application',
        name_bn: 'নূতন আবেদনপত্র'
    },
    {
        id: 2,
        name: 'Reissue Application',
        name_bn: 'রি-ইস্যু আবেদনপত্র'
    }
]

const directoryTypeList = [
    {
        id: 1,
        name: 'Dealer',
        name_bn: 'ব্যবসায়ী'
    },
    {
        id: 2,
        name: 'Shop',
        name_bn: 'দোকান'
    },
    {
        id: 3,
        name: 'machine',
        name_bn: 'যন্ত্র'
    }
]

const wardTypeList = [
    {
        id: 1,
        name: 'City Corporation',
        name_bn: 'সিটি কর্পোরেশন'
    },
    {
        id: 2,
        name: 'Pauroshoba',
        name_bn: 'পৌরসভা'
    },
    {
        id: 3,
        name: 'Union',
        name_bn: 'ইউনিয়ন'
    }
]

const activeIntactive = [
    {
        value: 0,
        name: 'Active',
        name_bn: 'সক্রিয়'
    },
    {
        value: 1,
        name: 'Inactive',
        name_bn: 'নিষ্ক্রিয়'
    }
]

const campaignTypeList = [
    {
        value: 1,
        text: 'Admin',
        text_bn: 'প্রশাসন'
    },
    {
        value: 2,
        text: 'Request',
        text_bn: 'অনুরোধ'
    },
    {
        value: 3,
        text: 'Divisional Head',
        text_bn: 'বিভাগীয় প্রধান'
    }
]
const participationCategoryList = [
    { value: 1, text_en: 'Deep Tubewell', text_bn: 'ডিপ টিউবওয়েল' },
    { value: 2, text_en: 'Irrigation Drain', text_bn: 'সেচ ড্রেন' },
    { value: 3, text_en: 'Electrification', text_bn: 'বিদ্যুতায়ন' },
    { value: 4, text_en: 'Solar', text_bn: 'সৌর' }
]

const waterTestingParameters = [
    { value: 1, text_en: 'Arsenic (As)', text_bn: 'আর্সেনিক (As)' },
    { value: 2, text_en: 'Iron (Fe)', text_bn: 'আয়রন (Fe)' },
    { value: 3, text_en: 'Calcium (Ca)', text_bn: 'ক্যালসিয়াম (Ca)' },
    { value: 4, text_en: 'Magnesium (Mg)', text_bn: 'ম্যাগনেসিয়াম (Mg)' },
    { value: 5, text_en: 'Total Hardness (TH)', text_bn: 'মোট কঠোরতা (TH)' },
    { value: 6, text_en: 'Chloride (Cl)', text_bn: 'ক্লোরাইড (Cl)' },
    { value: 7, text_en: 'Total Dissolve Solid (TDS)', text_bn: 'মোট দ্রবীভূত সলিড (TDS)' },
    { value: 8, text_en: 'Dissolved Oxygen (DO)', text_bn: 'দ্রবীভূত অক্সিজেন (DO)' },
    { value: 9, text_en: 'Hydrogen Ion Concentration (PH)', text_bn: 'হাইড্রোজেন আয়ন ঘনত্ব (PH)' },
    { value: 10, text_en: 'Electric Conductivity (EC)', text_bn: 'তড়িৎ পরিবাহিতা (EC)' },
    { value: 11, text_en: 'Fecal Coli form (FC)', text_bn: 'ফেকাল কলিফর্ম (FC)' },
    { value: 12, text_en: 'Sodium (Na)', text_bn: 'সোডিয়াম (Na)' },
    { value: 13, text_en: 'Potassium (K)', text_bn: 'পটাশিয়াম (K)' }
]

const pumpOptAppStatus = [
    {
        value: 1,
        text: 'Pending',
        text_bn: 'বিচারাধীন'
    },
    {
        value: 2,
        text: 'Processing',
        text_bn: 'প্রক্রিয়াধীন'
    },
    {
        value: 3,
        text: 'Approved',
        text_bn: 'অনুমোদন'
    },
    {
        value: 4,
        text: 'Reject',
        text_bn: 'প্রত্যাখ্যান'
    },
    {
        value: 5,
        text: 'Send',
        text_bn: 'প্রত্যাখ্যান'
    },
    {
        value: 6,
        text: 'Send for Survey',
        text_bn: 'জরিপের জন্য প্রেরণ করুন'
    },
    {
        value: 7,
        text: 'Receive',
        text_bn: 'প্রাপ্তি'
    },
    {
        value: 8,
        text: 'Survey Submit',
        text_bn: 'জরিপ জমা দিন'
    }
]

const buttonTypeList = [
    {
        value: 1,
        text: 'Pending',
        text_en: 'Pending',
        text_bn: 'বিচারাধীন'
    },
    {
        value: 2,
        text: 'Processing',
        text_en: 'Processing',
        text_bn: 'প্রক্রিয়াধীন'
    },
    {
        value: 3,
        text: 'Approved',
        text_en: 'Approved',
        text_bn: 'অনুমোদন'
    },
    {
        value: 4,
        text: 'Reject',
        text_en: 'Reject',
        text_bn: 'প্রত্যাখ্যান'
    },
    {
        value: 5,
        text: 'Send',
        text_en: 'Send',
        text_bn: 'পাঠান'
    },
    {
        value: 6,
        text: 'Forward',
        text_en: 'Forward',
        text_bn: 'ফরোয়ার্ড'
    },
    {
        value: 7,
        text: 'Receive',
        text_en: 'Receive',
        text_bn: 'প্রাপ্তি'
    },
    {
        value: 8,
        text: 'Application',
        text_en: 'Application',
        text_bn: 'আবেদন'
    },
    {
        value: 9,
        text: 'Assign',
        text_en: 'Assign',
        text_bn: 'বরাদ্দ'
    }
]

const mediaList = [
    {
        value: 1,
        text: 'Mobile',
        text_en: 'Mobile',
        text_bn: 'মোবাইল'
    },
    {
        value: 2,
        text: 'Email',
        text_en: 'Email',
        text_bn: 'ইমেইল'
    },
    {
        value: 3,
        text: 'Web',
        text_en: 'Web',
        text_bn: 'ওয়েব'
    }
]

const recipientList = [
    {
        value: 1,
        text: 'Sender',
        text_en: 'Sender',
        text_bn: 'প্রেরক'
    },
    {
        value: 2,
        text: 'Receiver',
        text_en: 'Receiver',
        text_bn: 'প্রাপক'
    }
]

const ginnerGrower = [
    {
        value: 1,
        text: 'Ginner',
        text_en: 'Ginner',
        text_bn: 'জিনার'
    },
    {
        value: 2,
        text: 'Grower',
        text_en: 'Grower',
        text_bn: 'উত্পাদক'
    }
]

const growerBuyer = [
    {
        value: 1,
        text: 'Grower',
        text_en: 'Grower',
        text_bn: 'উত্পাদক'
    },
    {
        value: 2,
        text: 'Buyer',
        text_en: 'Buyer',
        text_bn: 'ক্রেতা'
    }
]
const monthList = [
    {
      value: 1,
      text_en: 'January',
      text_bn: 'জানুয়ারী'
    },
    {
      value: 2,
      text_en: 'February',
      text_bn: 'ফেব্রুয়ারী'
    },
    {
      value: 3,
      text_en: 'March',
      text_bn: 'মার্চ'
    },
    {
      value: 4,
      text_en: 'April',
      text_bn: 'এপ্রিল'
    },
    {
      value: 5,
      text_en: 'May',
      text_bn: 'মে'
    },
    {
      value: 6,
      text_en: 'June',
      text_bn: 'জুন'
    },
    {
      value: 7,
      text_en: 'July',
      text_bn: 'জুলাই'
    },
    {
      value: 8,
      text_en: 'August',
      text_bn: 'আগস্ট'
    },
    {
      value: 9,
      text_en: 'September',
      text_bn: 'সেপ্টেম্বর'
    },
    {
      value: 10,
      text_en: 'October',
      text_bn: 'অক্টোবর'
    },
    {
      value: 11,
      text_en: 'November',
      text_bn: 'নভেম্বর'
    },
    {
      value: 12,
      text_en: 'December',
      text_bn: 'ডিসেম্বর'
    }
]
const banglaMonthList = [
    {
      value: 1,
      text_en: 'Boishakh',
      text_bn: 'বৈশাখ'
    },
    {
      value: 2,
      text_en: 'Joishtho',
      text_bn: 'জ্যৈষ্ঠ'
    },
    {
      value: 3,
      text_en: 'Ashaarh',
      text_bn: 'আষাঢ়'
    },
    {
      value: 4,
      text_en: 'Srabon',
      text_bn: 'শ্রাবণ'
    },
    {
      value: 5,
      text_en: 'Badro',
      text_bn: 'ভাদ্র'
    },
    {
      value: 6,
      text_en: 'Ashsin',
      text_bn: 'আশ্বিন'
    },
    {
      value: 7,
      text_en: 'Kartik',
      text_bn: 'কার্তিক'
    },
    {
      value: 8,
      text_en: 'Ogrohaeon',
      text_bn: 'অগ্রহায়ণ'
    },
    {
      value: 9,
      text_en: 'Poush',
      text_bn: 'পৌষ'
    },
    {
      value: 10,
      text_en: 'Magh',
      text_bn: 'মাঘ'
    },
    {
      value: 11,
      text_en: 'Falgoon',
      text_bn: 'ফাল্গুন'
    },
    {
      value: 12,
      text_en: 'Choitro',
      text_bn: 'চৈত্র'
    }
]
const subsdiyCircularTypes = [
    {
      value: 1,
      text_en: 'Subsidy',
      text_bn: 'ভর্তুকি'
    },
    {
      value: 2,
      text_en: 'Incentive',
      text_bn: 'প্রণোদনা'
    },
    {
      value: 3,
      text_en: 'Rehabilitation',
      text_bn: 'পুনর্বাসন'
    }
]

export default {
    waterTestingParameters,
    activeIntactive,
    noticeForList,
    statusList,
    refundByList,
    paymentTypeList,
    reportTypes,
    formTypes,
    irrigationTaskTypeList,
    testingTypeList,
    waterTestingStatusList,
    maritalStatus,
    genderList,
    genderListEx,
    smartCardStatus,
    reissueStatus,
    paymentApplicationTypeList,
    paymentSchemeBADCPaymentTypeList,
    paymentSchemeBMDAPaymentTypeList,
    schemePaymentList,
    paymetPumpOperationPaymentTypeList,
    paymetSmartCardPaymentTypeList,
    paymetWaterTestingPaymentTypeList,
    smartCardStatusList,
    smartCardApplicationTypeList,
    directoryTypeList,
    wardTypeList,
    participationCategoryList,
    pumpOptAppStatus,
    buttonTypeList,
    recipientList,
    mediaList,
    ginnerGrower,
    campaignTypeList,
    growerBuyer,
    monthList,
    banglaMonthList,
    subsdiyCircularTypes
}
