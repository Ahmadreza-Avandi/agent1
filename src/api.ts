import { PatientData, DiagnosisResponse } from './types';

const PROXY_BASE_URL = 'https://mine-gpt-alpha.vercel.app/proxy';

export async function submitTestAnalysis(data: PatientData): Promise<DiagnosisResponse> {
  const prompt = `
شما یک پزشک متخصص با تجربه بالا در تشخیص بیماری‌ها هستید. لطفاً بر اساس اطلاعات زیر، یک برنامه درمانی جامع ارائه دهید:

### اطلاعات بیمار:
- سن: ${data.age} ${data.ageUnit === 'year' ? 'سال' : 'ماه'}
- جنسیت: ${data.gender === 'male' ? 'مرد' : 'زن'}
- وزن: ${data.weight} ${data.weightUnit === 'kilogram' ? 'کیلوگرم' : 'گرم'}

### علائم بالینی:
${data.symptoms}

### سابقه پزشکی:
${data.medicalHistory || 'بدون سابقه خاص'}

### لطفاً موارد زیر را در تحلیل خود ارائه دهید:

1. **تحلیل بیماری و علائم:**
   - بررسی علائم با توجه به  شرایط بیمار
   - ارزیابی سابقه پزشکی و تأثیر آن بر وضعیت فعلی

2. **تشخیص احتمالی:**
   - بیماری‌های محتمل با توجه به علائم
   - دلایل تشخیص

3. **برنامه درمانی:**
   - داروهای پیشنهادی با ذکر دوز مصرف
   - مدت درمان
   - تناوب مصرف داروها

4. **توصیه‌های درمانی:**
   - استراحت و فعالیت
   - زمان مراجعه مجدد به پزشک

لطفاً پاسخ را به صورت ساختاریافته و با جزئیات کامل ارائه دهید.
`.trim();

  try {
    const response = await fetch(
      `${PROXY_BASE_URL}?${new URLSearchParams({
        text: prompt
      }).toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`خطا در دریافت پاسخ: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.results) {
      throw new Error('پاسخی از سرور دریافت نشد');
    }

    return {
      result: responseData.results,
      message: responseData.results,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'خطای ناشناخته در ارتباط با سرور'
    );
  }
}
