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
const priceEntryTypeList = [
    {
        value: 'Market',
        text_en: 'Market',
        text_bn: 'বাজার'
    },
    {
        value: 'Grower',
        text_en: 'Grower',
        text_bn: 'চাষী'
    }
]
const priceTypeList = [
    {
        entry_type: 'Market',
        id: 1,
        value: 'Wholesale',
        text_en: 'Wholesale',
        text_bn: 'পাইকারি'
    },
    {
        entry_type: 'Market',
        id: 2,
        value: 'Retail',
        text_en: 'Retail',
        text_bn: 'খুচরা'
    },
    {
        entry_type: 'Grower',
        id: 3,
        value: 'Grower',
        text_en: 'Grower',
        text_bn: 'প্রযোজক'
    }
]
const timePreiodList = [
    {
        value: 'Daily',
        text_en: 'Daily',
        text_bn: 'দৈনিক'
    },
    {
        value: 'Weekly',
        text_en: 'Weekly',
        text_bn: 'সাপ্তাহিক'
    }
]

const dayList = [
    {
        value: 1,
        text_en: 'Daily',
        text_bn: 'প্রতিদিন'
    },
    {
        value: 2,
        text_en: 'Friday',
        text_bn: 'শুক্রবার'
    },
    {
        value: 3,
        text_en: 'Saturday',
        text_bn: 'শনিবার'
    },
    {
        value: 4,
        text_en: 'Sunday',
        text_bn: 'রবিবার'
    },
    {
        value: 5,
        text_en: 'Monday',
        text_bn: 'সোমবার'
    },
    {
        value: 6,
        text_en: 'Tuesday',
        text_bn: 'মঙ্গলবার'
    },
    {
        value: 7,
        text_en: 'Wednesday',
        text_bn: 'বুধবার'
    },
    {
        value: 8,
        text_en: 'Thursday',
        text_bn: 'বৃহস্পতিবার'
    }
]

const weekList = [
    {
        value: '1',
        text_en: '1',
        text_bn: '১'
    },
    {
        value: '2',
        text_en: '2',
        text_bn: '২'
    },
    {
        value: '3',
        text_en: '3',
        text_bn: '৩'
    },
    {
        value: '4',
        text_en: '4',
        text_bn: '৪'
    }
]

const yearList = [
    {
        value: '2020',
        text_en: '2020',
        text_bn: '২০২০'
    },
    {
        value: '2021',
        text_en: '2021',
        text_bn: '২০২১'
    },
    {
        value: '2022',
        text_en: '2022',
        text_bn: '২০২২'
    },
    {
        value: '2023',
        text_en: '2023',
        text_bn: '২০২৩'
    },
    {
        value: '2024',
        text_en: '2024',
        text_bn: '২০২৪'
    },
    {
        value: '2025',
        text_en: '2025',
        text_bn: '২০২৫'
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

export default {
    campaignTypeList, priceEntryTypeList, timePreiodList, weekList, yearList, priceTypeList, dayList, monthList
}
