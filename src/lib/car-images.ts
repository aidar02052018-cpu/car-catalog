// Фото моделей — Wikimedia Commons (свободные лицензии, стабильные URL).
// Каждое фото подобрано к конкретной модели через Wikipedia REST API.
// Размер 1280px — стандартный preset Wikimedia, гарантированно отдаётся.

const W = (path: string) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}`;

export const CAR_IMAGES: Record<string, string> = {
  "bmw-x5": W("f/f1/2019_BMW_X5_M50d_Automatic_3.0.jpg/1280px-2019_BMW_X5_M50d_Automatic_3.0.jpg"),
  "tesla-model-y": W("b/bd/2022_Tesla_Model_Y_Long_Range_AWD_Front.jpg/1280px-2022_Tesla_Model_Y_Long_Range_AWD_Front.jpg"),
  "porsche-911": W("a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg/1280px-Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg"),
  "toyota-camry": W("a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/1280px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg"),

  "bmw-x7": W("a/ac/BMW_G07_X7_xDrive_40i_Design_Pure_Excellence_Alpine_White_%281%29_%28cropped%29.jpg/1280px-BMW_G07_X7_xDrive_40i_Design_Pure_Excellence_Alpine_White_%281%29_%28cropped%29.jpg"),
  "mercedes-gle": W("8/8b/Mercedes-Benz_GLE_350_d_4MATIC_AMG_Line_%28V_167%29_%E2%80%93_f_18042021.jpg/1280px-Mercedes-Benz_GLE_350_d_4MATIC_AMG_Line_%28V_167%29_%E2%80%93_f_18042021.jpg"),
  "mercedes-gls": W("4/4a/Mercedes-Benz_X167_IMG_5259.jpg/1280px-Mercedes-Benz_X167_IMG_5259.jpg"),
  "audi-q7": W("5/5f/Audi_Q7_4M_FL2_3.0_V6_MHEV_quattro_Satellite_Silver_Metallic_01_%28cropped%29.jpg/1280px-Audi_Q7_4M_FL2_3.0_V6_MHEV_quattro_Satellite_Silver_Metallic_01_%28cropped%29.jpg"),
  "porsche-cayenne": W("f/fb/Porsche_Cayenne_%28III%2C_Facelift%29_%E2%80%93_f_01012025.jpg/1280px-Porsche_Cayenne_%28III%2C_Facelift%29_%E2%80%93_f_01012025.jpg"),
  "range-rover-sport": W("a/aa/2015_Land_Rover_Range_Rover_Sport_HSE_3.0_Front.jpg/1280px-2015_Land_Rover_Range_Rover_Sport_HSE_3.0_Front.jpg"),
  "lexus-lx": W("3/34/2018_Lexus_LX_570_%28facelift%29%2C_front_3.24.23.jpg/1280px-2018_Lexus_LX_570_%28facelift%29%2C_front_3.24.23.jpg"),

  "bmw-5": W("8/86/BMW_G60_520i_1X7A2443.jpg/1280px-BMW_G60_520i_1X7A2443.jpg"),
  "mercedes-e": W("f/fd/Mercedes-Benz_W214_1X7A1841.jpg/1280px-Mercedes-Benz_W214_1X7A1841.jpg"),
  "audi-a6": W("e/eb/Audi_A6_C9_IAA_2025_DSC_1920.jpg/1280px-Audi_A6_C9_IAA_2025_DSC_1920.jpg"),
  "audi-a8": W("3/31/2018_Audi_A8_50_TDi_Quattro_Automatic_3.0.jpg/1280px-2018_Audi_A8_50_TDi_Quattro_Automatic_3.0.jpg"),
  "lexus-es": W("7/7c/Lexus_ES_350_%28GSZ10%29_IMG_4332.jpg/1280px-Lexus_ES_350_%28GSZ10%29_IMG_4332.jpg"),
  "genesis-g80": W("f/f7/Genesis_G80_IAA_2021_1X7A0229.jpg/1280px-Genesis_G80_IAA_2021_1X7A0229.jpg"),

  "toyota-rav4": W("6/62/Toyota_RAV4_XLE_%28facelift%29_%28front%29.jpg/1280px-Toyota_RAV4_XLE_%28facelift%29_%28front%29.jpg"),
  "mazda-cx-5": W("a/a5/2024_Mazda_CX-5_2.5_S_Select_in_Platinum_Quartz_Metallic%2C_front_right.jpg/1280px-2024_Mazda_CX-5_2.5_S_Select_in_Platinum_Quartz_Metallic%2C_front_right.jpg"),
  "nissan-x-trail": W("3/35/Nissan_X-Trail_%28T33%29_1X7A7179.jpg/1280px-Nissan_X-Trail_%28T33%29_1X7A7179.jpg"),
  "honda-cr-v": W("1/1b/Honda_CR-V_e-HEV_Elegance_AWD_%28VI%29_%E2%80%93_f_14072024.jpg/1280px-Honda_CR-V_e-HEV_Elegance_AWD_%28VI%29_%E2%80%93_f_14072024.jpg"),
  "subaru-forester": W("4/48/Subaru_Forester_%28SL%29_e-BOXER_DSC_8811.jpg/1280px-Subaru_Forester_%28SL%29_e-BOXER_DSC_8811.jpg"),
  "kia-sportage": W("5/5d/2025_Kia_Sportage_S_front_only.jpg/1280px-2025_Kia_Sportage_S_front_only.jpg"),
  "hyundai-tucson": W("c/c6/2022_Hyundai_Tucson_Preferred%2C_Front_Right%2C_05-24-2021.jpg/1280px-2022_Hyundai_Tucson_Preferred%2C_Front_Right%2C_05-24-2021.jpg"),
  "skoda-karoq": W("f/f2/Skoda_Karoq_%E2%80%93_f_18042025.jpg/1280px-Skoda_Karoq_%E2%80%93_f_18042025.jpg"),

  "tesla-model-3": W("a/ab/Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg/1280px-Tesla_Model_3_%282023%29_Autofr%C3%BChling_Ulm_IMG_9282.jpg"),
  "bmw-ix3": W("5/58/BMW_iX3_NA5_IMG_5333.jpg/1280px-BMW_iX3_NA5_IMG_5333.jpg"),
  "audi-q4-etron": W("0/05/2021_Audi_Q4_e-tron_Sport_35.jpg/1280px-2021_Audi_Q4_e-tron_Sport_35.jpg"),
  "volvo-ex30": W("e/eb/Volvo_EX30_IMG_8923.jpg/1280px-Volvo_EX30_IMG_8923.jpg"),
  "polestar-2": W("c/ca/Polestar_2_%E2%80%93_f_02042021.jpg/1280px-Polestar_2_%E2%80%93_f_02042021.jpg"),

  "honda-accord": W("2/26/2023_Honda_Accord_LX%2C_front_left%2C_07-13-2023.jpg/1280px-2023_Honda_Accord_LX%2C_front_left%2C_07-13-2023.jpg"),
  "mazda-6": W("e/ea/2018_Mazda6_Sport_NAV%2B_Diesel_2.2_Front.jpg/1280px-2018_Mazda6_Sport_NAV%2B_Diesel_2.2_Front.jpg"),
  "skoda-octavia": W("e/ea/Skoda_Octavia_IV_liftback_%28cropped%29.jpg/1280px-Skoda_Octavia_IV_liftback_%28cropped%29.jpg"),
  "vw-passat": W("9/9b/VW_Passat_Variant_Elegance_%28B9%29_%E2%80%93_f_18052025.jpg/1280px-VW_Passat_Variant_Elegance_%28B9%29_%E2%80%93_f_18052025.jpg"),
  "hyundai-sonata": W("1/1d/2024_Hyundai_Sonata_SEL%2C_front_right.jpg/1280px-2024_Hyundai_Sonata_SEL%2C_front_right.jpg"),

  "geely-coolray": W("c/c1/2018_Geely_Binyue.jpg/1280px-2018_Geely_Binyue.jpg"),
  "geely-atlas": W("6/6d/2023_Geely_Boyue_L_%282%29%2C_front_8.3.23.jpg/1280px-2023_Geely_Boyue_L_%282%29%2C_front_8.3.23.jpg"),
  "chery-tiggo-7-pro": W("7/76/Chery_Tiggo_7_II_014_%28cropped%29.jpg/1280px-Chery_Tiggo_7_II_014_%28cropped%29.jpg"),
  "chery-tiggo-8-pro": W("3/37/Chery_Tiggo_8_Plus_018_%28cropped%29.jpg/1280px-Chery_Tiggo_8_Plus_018_%28cropped%29.jpg"),
  "haval-jolion": W("a/ac/2020_Great_Wall_Haval_Jolion_%28front%29.jpg/1280px-2020_Great_Wall_Haval_Jolion_%28front%29.jpg"),
  "haval-f7": W("9/96/Haval_F7_IMG001.jpg/1280px-Haval_F7_IMG001.jpg"),

  "vw-golf": W("8/8a/2020_Volkswagen_Golf_Style_1.5_Front.jpg/1280px-2020_Volkswagen_Golf_Style_1.5_Front.jpg"),
  "skoda-scala": W("7/7d/Skoda_Scala_IMG_2515.jpg/1280px-Skoda_Scala_IMG_2515.jpg"),
  "kia-rio": W("c/c4/2021_Kia_Rio_3_MHEV_facelift_1.0.jpg/1280px-2021_Kia_Rio_3_MHEV_facelift_1.0.jpg"),
  "hyundai-solaris": W("9/9d/2019_Hyundai_Accent_1.6L%2C_front_10.8.19.jpg/1280px-2019_Hyundai_Accent_1.6L%2C_front_10.8.19.jpg"),

  "bmw-m4": W("e/e2/2021_BMW_M4_Competition_Automatic_3.0_Front.jpg/1280px-2021_BMW_M4_Competition_Automatic_3.0_Front.jpg"),
  "mercedes-amg-gt": W("a/a9/Festival_automobile_international_2015_-_Mercedes_AMG_GT_-_003.jpg/1280px-Festival_automobile_international_2015_-_Mercedes_AMG_GT_-_003.jpg"),
  "audi-rs5": W("8/88/Audi_RS4_Avant_grey_Free_Car_Picture_-_Give_Credit_Via_Link_%28cropped%29.jpg/1280px-Audi_RS4_Avant_grey_Free_Car_Picture_-_Give_Credit_Via_Link_%28cropped%29.jpg"),

  "volvo-xc60": W("1/1a/2018_Volvo_XC60_R-Design_D5_P-Pulse_2.0_Front.jpg/1280px-2018_Volvo_XC60_R-Design_D5_P-Pulse_2.0_Front.jpg"),
  "volvo-xc90": W("2/23/Volvo_XC90_T8_AWD_Plug-in_Hybrid_Plus_%28II%2C_2._Facelift%29_%E2%80%93_f_03102025.jpg/1280px-Volvo_XC90_T8_AWD_Plug-in_Hybrid_Plus_%28II%2C_2._Facelift%29_%E2%80%93_f_03102025.jpg"),
};
