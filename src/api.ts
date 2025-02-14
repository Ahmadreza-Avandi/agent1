import { PatientData, DiagnosisResponse } from './types';

const PROXY_BASE_URL = 'https://irandvm.ir/proxy';

export async function submitTestAnalysis(
  data: PatientData
): Promise<DiagnosisResponse> {
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

لطفاً پاسخ را به صورت ساختاریافته و با جزئیات کامل ارائه دهید.
`.trim();

  try {
    const response = await fetch(
      `${PROXY_BASE_URL}?${new URLSearchParams({ text: prompt }).toString()}`
    );

    if (!response.ok) {
      throw new Error(`خطا در دریافت پاسخ: ${response.status}`);
    }

    const responseData = await response.json();

    // بررسی ساختار پاسخ سرور
    if (!responseData.ok || !responseData.answer) {
      throw new Error(responseData.error || 'پاسخ نامعتبر از سرور');
    }

    return {
      result: responseData.answer,
      message: responseData.answer,
      rawData: responseData // اضافه کردن داده خام برای دیباگ
    };

  } catch (error) {
    console.error('جزئیات خطا:', error);
    throw new Error(
      error instanceof Error ? error.message : 'خطای ناشناخته در ارتباط با سرور'
    );
  }
}
