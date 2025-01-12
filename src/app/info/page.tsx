'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button' // Import the Button component
import { motion } from 'motion/react'

const spring_transition = {
  type: 'spring',
  stiffness: 200, // Controls how tight the spring is
  damping: 30, // Controls the resistance of the spring
  bounce: 0.5, // Controls the amount of bounce (0 to 2 is common)
  duration: 0.6, // Optional, spring usually ignores this unless combined
}

// TODO: This would one be placed in a database that could be freely changed, hardcoded for now cus bad
const illnessesData = [
  {
    name: 'Fungal infection',
    description:
      'A disease caused by fungi that can affect various parts of the body.',
    treatments: [
      {
        name: 'Antifungal Medication',
        effectiveness: 80,
        sideEffects: ['Nausea', 'Headache', 'Skin rash'],
      },
      {
        name: 'Topical Creams',
        effectiveness: 70,
        sideEffects: ['Skin irritation', 'Burning sensation'],
      },
    ],
    outlook:
      'Generally good with proper treatment, but may recur in some cases.',
    duration:
      'Varies from a few days to several weeks, depending on the type and location of the infection.',
    aggravatingFactors: [
      'Humid environments',
      'Poor hygiene',
      'Weakened immune system',
    ],
  },
  {
    name: 'Allergy',
    description:
      "An immune system response to a substance that's typically harmless.",
    treatments: [
      {
        name: 'Antihistamines',
        effectiveness: 75,
        sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision'],
      },
      {
        name: 'Immunotherapy',
        effectiveness: 85,
        sideEffects: ['Local reactions', 'Anaphylaxis (rare)'],
      },
    ],
    outlook: 'Can be managed effectively, but may be a lifelong condition.',
    duration: 'Varies from short-term (seasonal) to chronic (year-round).',
    aggravatingFactors: [
      'Exposure to allergens',
      'Stress',
      'Changes in weather',
    ],
  },
  {
    name: 'GERD',
    description:
      'A digestive disorder that affects the lower esophageal sphincter.',
    treatments: [
      {
        name: 'Proton Pump Inhibitors',
        effectiveness: 90,
        sideEffects: ['Headache', 'Nausea', 'Vitamin B12 deficiency'],
      },
      {
        name: 'Lifestyle Changes',
        effectiveness: 70,
        sideEffects: ['Difficulty adapting', 'Initial discomfort'],
      },
    ],
    outlook:
      'Can be effectively managed with treatment, but may require long-term care.',
    duration: 'Often a chronic condition requiring ongoing management.',
    aggravatingFactors: [
      'Spicy foods',
      'Fatty foods',
      'Lying down after eating',
    ],
  },
  {
    name: 'Chronic cholestasis',
    description:
      'A condition where bile flow from the liver is reduced or blocked.',
    treatments: [
      {
        name: 'Ursodeoxycholic Acid',
        effectiveness: 75,
        sideEffects: ['Diarrhea', 'Weight gain', 'Hair loss'],
      },
      {
        name: 'Cholestyramine',
        effectiveness: 65,
        sideEffects: ['Constipation', 'Bloating', 'Vitamin deficiencies'],
      },
    ],
    outlook:
      'Varies depending on the underlying cause, may require long-term management.',
    duration: 'Often chronic, but can be acute in some cases.',
    aggravatingFactors: ['Certain medications', 'Pregnancy', 'Genetic factors'],
  },
  {
    name: 'Drug Reaction',
    description:
      'An unexpected reaction to a medication, ranging from mild to severe.',
    treatments: [
      {
        name: 'Discontinuation of Offending Drug',
        effectiveness: 95,
        sideEffects: ['Withdrawal symptoms', 'Return of original condition'],
      },
      {
        name: 'Corticosteroids',
        effectiveness: 80,
        sideEffects: ['Weight gain', 'Mood changes', 'Increased blood sugar'],
      },
    ],
    outlook:
      'Generally good once the offending drug is identified and discontinued.',
    duration: 'Can range from hours to weeks after drug discontinuation.',
    aggravatingFactors: [
      'Continued use of offending drug',
      'Multiple drug interactions',
      'Genetic predisposition',
    ],
  },
  {
    name: 'Peptic ulcer diseae',
    description:
      'Open sores that develop on the inside lining of the stomach and small intestine.',
    treatments: [
      {
        name: 'Proton Pump Inhibitors',
        effectiveness: 85,
        sideEffects: ['Headache', 'Nausea', 'Vitamin B12 deficiency'],
      },
      {
        name: 'Antibiotics (for H. pylori)',
        effectiveness: 90,
        sideEffects: ['Diarrhea', 'Metallic taste', 'Nausea'],
      },
    ],
    outlook:
      'Generally good with proper treatment, but recurrence is possible.',
    duration: 'Healing typically occurs within 4-8 weeks with treatment.',
    aggravatingFactors: [
      'Stress',
      'Smoking',
      'Alcohol consumption',
      'Certain medications (e.g., NSAIDs)',
    ],
  },
  {
    name: 'AIDS',
    description:
      'A chronic, potentially life-threatening condition caused by the human immunodeficiency virus (HIV).',
    treatments: [
      {
        name: 'Antiretroviral Therapy',
        effectiveness: 95,
        sideEffects: ['Nausea', 'Fatigue', 'Lipodystrophy'],
      },
      {
        name: 'Opportunistic Infection Prophylaxis',
        effectiveness: 85,
        sideEffects: ['Rash', 'Fever', 'Liver toxicity'],
      },
    ],
    outlook:
      'Greatly improved with modern treatments, but remains a lifelong condition.',
    duration: 'Lifelong condition requiring ongoing management.',
    aggravatingFactors: [
      'Non-adherence to medication',
      'Untreated opportunistic infections',
      'Substance abuse',
    ],
  },
  {
    name: 'Diabetes',
    description:
      'A group of diseases that result in too much sugar in the blood.',
    treatments: [
      {
        name: 'Insulin Therapy',
        effectiveness: 90,
        sideEffects: [
          'Hypoglycemia',
          'Weight gain',
          'Injection site reactions',
        ],
      },
      {
        name: 'Metformin',
        effectiveness: 80,
        sideEffects: ['Nausea', 'Diarrhea', 'Vitamin B12 deficiency'],
      },
    ],
    outlook:
      'Can be effectively managed but requires lifelong care and monitoring.',
    duration: 'Chronic condition requiring ongoing management.',
    aggravatingFactors: ['Poor diet', 'Lack of exercise', 'Obesity', 'Stress'],
  },
  {
    name: 'Gastroenteritis',
    description:
      'An intestinal infection marked by diarrhea, abdominal cramps, nausea, vomiting, and fever.',
    treatments: [
      {
        name: 'Oral Rehydration Therapy',
        effectiveness: 85,
        sideEffects: ['None significant'],
      },
      {
        name: 'Antibiotics (for bacterial causes)',
        effectiveness: 75,
        sideEffects: ['Nausea', 'Diarrhea', 'Allergic reactions'],
      },
    ],
    outlook:
      'Generally good, with most cases resolving within a few days to a week.',
    duration: 'Usually lasts 1-3 days, but can persist for up to 10 days.',
    aggravatingFactors: [
      'Poor hygiene',
      'Contaminated food or water',
      'Close contact with infected individuals',
    ],
  },
  {
    name: 'Bronchial Asthma',
    description:
      "A condition in which a person's airways become inflamed, narrow and swell, and produce extra mucus.",
    treatments: [
      {
        name: 'Inhaled Corticosteroids',
        effectiveness: 85,
        sideEffects: ['Oral thrush', 'Hoarseness', 'Cough'],
      },
      {
        name: 'Bronchodilators',
        effectiveness: 80,
        sideEffects: ['Tremor', 'Rapid heartbeat', 'Headache'],
      },
    ],
    outlook:
      'Can be effectively managed but requires ongoing care and monitoring.',
    duration: 'Chronic condition with intermittent acute episodes.',
    aggravatingFactors: [
      'Allergens',
      'Air pollution',
      'Respiratory infections',
      'Exercise',
      'Stress',
    ],
  },
  {
    name: 'Hypertension',
    description:
      'A chronic condition characterized by persistently elevated blood pressure in the arteries.',
    treatments: [
      {
        name: 'ACE Inhibitors',
        effectiveness: 75,
        sideEffects: ['Dry cough', 'Dizziness', 'Elevated potassium levels'],
      },
      {
        name: 'Lifestyle Modifications',
        effectiveness: 60,
        sideEffects: ['Initial discomfort', 'Difficulty adapting'],
      },
    ],
    outlook:
      'Can be managed effectively with medication and lifestyle changes, but requires lifelong monitoring.',
    duration: 'Chronic condition requiring ongoing management.',
    aggravatingFactors: [
      'High sodium diet',
      'Lack of exercise',
      'Obesity',
      'Stress',
      'Genetics',
      'Smoking',
      'Alcohol consumption',
    ],
  },
  {
    name: 'Migraine',
    description:
      'A neurological condition characterized by intense, debilitating headaches, often accompanied by other symptoms.',
    treatments: [
      {
        name: 'Triptans',
        effectiveness: 70,
        sideEffects: ['Nausea', 'Dizziness', 'Chest tightness'],
      },
      {
        name: 'CGRP Antagonists',
        effectiveness: 65,
        sideEffects: [
          'Constipation',
          'Muscle cramps',
          'Injection site reactions',
        ],
      },
    ],
    outlook:
      'Can be managed with medication and lifestyle changes, but may be a lifelong condition.',
    duration: 'Episodes can last from hours to days.',
    aggravatingFactors: [
      'Stress',
      'Hormonal changes',
      'Certain foods and drinks',
      'Lack of sleep',
      'Bright lights',
      'Loud noises',
    ],
  },
  {
    name: 'Cervical spondylosis',
    description:
      'Age-related wear and tear affecting the spinal disks in your neck, causing pain and stiffness.',
    treatments: [
      {
        name: 'Physical Therapy',
        effectiveness: 70,
        sideEffects: ['Temporary pain increase', 'Muscle soreness'],
      },
      {
        name: 'Nonsteroidal anti-inflammatory drugs (NSAIDs)',
        effectiveness: 65,
        sideEffects: [
          'Stomach upset',
          'Increased bleeding risk',
          'Kidney problems',
        ],
      },
    ],
    outlook:
      'Can be managed with conservative treatments, but may worsen over time.',
    duration: 'Chronic condition, symptoms may fluctuate.',
    aggravatingFactors: [
      'Poor posture',
      'Repetitive neck movements',
      'Trauma',
      'Age',
    ],
  },
  {
    name: 'Paralysis (brain hemorrhage)',
    description: 'Loss of muscle function caused by bleeding in the brain.',
    treatments: [
      {
        name: 'Surgical Intervention',
        effectiveness: 80,
        sideEffects: [
          'Infection risk',
          'Complications from anesthesia',
          'Further brain damage',
        ],
      },
      {
        name: 'Rehabilitation Therapy',
        effectiveness: 75,
        sideEffects: ['Fatigue', 'Emotional stress', 'Temporary pain'],
      },
    ],
    outlook:
      'Varies greatly depending on the severity and location of the hemorrhage.',
    duration:
      'Can be permanent or temporary, depending on the extent of the damage.',
    aggravatingFactors: [
      'High blood pressure',
      'Aneurysms',
      'Blood clotting disorders',
      'Trauma',
    ],
  },
  {
    name: 'Jaundice',
    description:
      'A condition causing yellowing of the skin and whites of the eyes due to a buildup of bilirubin in the blood.',
    treatments: [
      {
        name: 'Phototherapy',
        effectiveness: 85,
        sideEffects: ['Dehydration', 'Skin rash', 'Overheating'],
      },
      {
        name: 'Addressing Underlying Cause',
        effectiveness: 90,
        sideEffects: ['Varies based on specific treatment'],
      },
    ],
    outlook:
      'Depends entirely on the underlying cause; treatment focuses on resolving the root issue.',
    duration: 'Varies depending on the underlying cause and its treatment.',
    aggravatingFactors: [
      'Liver disease',
      'Gallstones',
      'Certain medications',
      'Genetic disorders',
    ],
  },
  {
    name: 'Malaria',
    description:
      'A serious mosquito-borne disease caused by a parasite, leading to flu-like symptoms and potential complications.',
    treatments: [
      {
        name: 'Artemisinin-based combination therapies (ACTs)',
        effectiveness: 95,
        sideEffects: ['Nausea', 'Dizziness', 'Fatigue'],
      },
      {
        name: 'Chloroquine (for certain strains)',
        effectiveness: 80,
        sideEffects: ['Stomach upset', 'Headache', 'Visual disturbances'],
      },
    ],
    outlook:
      'Generally good with prompt treatment, but can be life-threatening if left untreated.',
    duration:
      'Symptoms typically last for a week or two, but complications can arise.',
    aggravatingFactors: [
      'Mosquito bites',
      'Travel to malaria-endemic areas',
      'Weakened immune system',
    ],
  },
  {
    name: 'Chicken pox',
    description:
      'A highly contagious viral infection causing an itchy, blister-like rash on the skin.',
    treatments: [
      {
        name: 'Antiviral Medications',
        effectiveness: 70,
        sideEffects: ['Nausea', 'Headache', 'Dizziness'],
      },
      {
        name: 'Symptomatic Treatment',
        effectiveness: 60,
        sideEffects: ['Minimal, varies by specific treatment'],
      },
    ],
    outlook: 'Generally good, with most cases resolving within 2-3 weeks.',
    duration: 'Typically lasts 1-2 weeks.',
    aggravatingFactors: [
      'Close contact with infected individuals',
      'Weakened immune system',
    ],
  },
  {
    name: 'Dengue',
    description:
      'A mosquito-borne viral infection causing severe flu-like symptoms and potential complications.',
    treatments: [
      {
        name: 'Supportive Care',
        effectiveness: 85,
        sideEffects: ['Minimal'],
      },
      {
        name: 'Fluid Replacement Therapy',
        effectiveness: 90,
        sideEffects: ['Fluid overload', 'Electrolyte imbalance'],
      },
    ],
    outlook: 'Most recover fully, but severe cases can be life-threatening.',
    duration: 'Symptoms typically last for 7-10 days.',
    aggravatingFactors: [
      'Mosquito bites',
      'Travel to dengue-endemic areas',
      'Weakened immune system',
    ],
  },
  {
    name: 'Typhoid',
    description:
      'A bacterial infection that can spread throughout the body, affecting many organs.',
    treatments: [
      {
        name: 'Antibiotics',
        effectiveness: 95,
        sideEffects: ['Nausea', 'Diarrhea', 'Allergic reactions'],
      },
      {
        name: 'Supportive Care',
        effectiveness: 75,
        sideEffects: ['Minimal'],
      },
    ],
    outlook:
      'Generally good with prompt treatment, but can be life-threatening if left untreated.',
    duration: 'Symptoms can last for several weeks if untreated.',
    aggravatingFactors: [
      'Contaminated food or water',
      'Poor hygiene',
      'Weakened immune system',
    ],
  },
  {
    name: 'Hepatitis A',
    description:
      'A highly contagious liver infection caused by the hepatitis A virus.',
    treatments: [
      {
        name: 'Supportive Care',
        effectiveness: 90,
        sideEffects: ['Minimal'],
      },
      {
        name: 'Vaccination (for prevention)',
        effectiveness: 95,
        sideEffects: ['Soreness at injection site', 'Headache', 'Fatigue'],
      },
    ],
    outlook: 'Most recover fully within a few months.',
    duration: 'Symptoms typically last for several weeks.',
    aggravatingFactors: [
      'Contaminated food or water',
      'Poor hygiene',
      'Close contact with infected individuals',
    ],
  },
  {
    name: 'Hepatitis B',
    description:
      'A serious liver infection caused by the hepatitis B virus that can become chronic.',
    treatments: [
      {
        name: 'Antiviral Medications',
        effectiveness: 70,
        sideEffects: ['Nausea', 'Fatigue', 'Headache'],
      },
      {
        name: 'Interferon Alfa-2b',
        effectiveness: 40,
        sideEffects: ['Flu-like symptoms', 'Depression', 'Fatigue'],
      },
    ],
    outlook:
      'Varies, some clear the infection while others develop chronic hepatitis B.',
    duration:
      'Acute infection can last for several weeks to months; chronic infection is lifelong.',
    aggravatingFactors: [
      'Exposure to infected blood or bodily fluids',
      'Sexual contact with infected individuals',
      'Sharing needles',
    ],
  },
  {
    name: 'Hepatitis C',
    description:
      'A viral infection that causes liver inflammation, sometimes leading to serious liver damage.',
    treatments: [
      {
        name: 'Direct-acting Antivirals',
        effectiveness: 95,
        sideEffects: ['Fatigue', 'Headache', 'Nausea'],
      },
      {
        name: 'Liver Transplant (severe cases)',
        effectiveness: 85,
        sideEffects: ['Rejection risk', 'Immunosuppression side effects'],
      },
    ],
    outlook:
      'Highly curable with direct-acting antivirals, but chronic infection can lead to cirrhosis and liver cancer.',
    duration:
      'Acute infection can resolve spontaneously, but chronic infection is lifelong.',
    aggravatingFactors: [
      'Exposure to infected blood or bodily fluids',
      'Sharing needles',
      'Sexual contact with infected individuals',
    ],
  },
  {
    name: 'Hepatitis D',
    description:
      'A serious liver disease caused by the hepatitis D virus (HDV), which only occurs in people who are infected with hepatitis B.',
    treatments: [
      {
        name: 'Pegylated Interferon Alpha',
        effectiveness: 30,
        sideEffects: ['Flu-like symptoms', 'Depression', 'Anemia'],
      },
      {
        name: 'Supportive Care',
        effectiveness: 60,
        sideEffects: ['Minimal'],
      },
    ],
    outlook:
      'Poor prognosis, often leading to chronic liver disease and cirrhosis.',
    duration: 'Lifelong condition.',
    aggravatingFactors: 'Co-infection with Hepatitis B',
  },
  {
    name: 'Hepatitis E',
    description:
      'A liver disease caused by the hepatitis E virus, typically self-limiting but can be severe in certain populations.',
    treatments: [
      {
        name: 'Supportive Care',
        effectiveness: 90,
        sideEffects: ['Minimal'],
      },
      {
        name: 'Ribavirin (for chronic cases)',
        effectiveness: 75,
        sideEffects: ['Anemia', 'Fatigue', 'Irritability'],
      },
    ],
    outlook:
      'Generally good, with most cases resolving spontaneously, but can be severe in pregnant women and those with underlying liver disease.',
    duration: 'Acute infection typically resolves within a few weeks.',
    aggravatingFactors: [
      'Contaminated food or water',
      'Travel to Hepatitis E-endemic areas',
      'Pregnancy',
      'Weakened immune system',
    ],
  },
  {
    name: 'Alcoholic hepatitis',
    description:
      'Liver inflammation caused by drinking too much alcohol, potentially leading to liver failure and death.',
    treatments: [
      {
        name: 'Corticosteroids',
        effectiveness: 60,
        sideEffects: ['Increased infection risk', 'Osteoporosis', 'Diabetes'],
      },
      {
        name: 'Nutritional Support',
        effectiveness: 70,
        sideEffects: ['Minimal'],
      },
    ],
    outlook:
      "Varies depending on the severity of the disease and the individual's response to treatment.",
    duration:
      'Can be acute or chronic, depending on the extent of liver damage.',
    aggravatingFactors: [
      'Excessive alcohol consumption',
      'Poor nutrition',
      'Other liver diseases',
    ],
  },
  {
    name: 'Tuberculosis',
    description:
      'A potentially serious infectious disease that mainly affects the lungs.',
    treatments: [
      {
        name: 'Antibiotic Combination Therapy',
        effectiveness: 95,
        sideEffects: ['Liver damage', 'Skin rash', 'Vision changes'],
      },
      {
        name: 'Directly Observed Therapy (DOT)',
        effectiveness: 90,
        sideEffects: ['Inconvenience', 'Potential stigma'],
      },
    ],
    outlook:
      'Generally good with proper treatment, but drug-resistant strains can be challenging to treat.',
    duration: 'Treatment typically lasts for several months.',
    aggravatingFactors: [
      'Weakened immune system',
      'Close contact with infected individuals',
      'Poor living conditions',
    ],
  },
  {
    name: 'Common Cold',
    description:
      'A viral infection of the upper respiratory tract, causing symptoms like runny nose, sore throat, and cough.',
    treatments: [
      {
        name: 'Symptomatic Treatment',
        effectiveness: 60,
        sideEffects: ['Varies based on specific treatment'],
      },
      {
        name: 'Rest and Hydration',
        effectiveness: 70,
        sideEffects: ['Minimal'],
      },
    ],
    outlook: 'Generally good, with most cases resolving within a week or two.',
    duration: 'Typically lasts 7-10 days.',
    aggravatingFactors: ['Exposure to viruses', 'Weakened immune system'],
  },
  {
    name: 'Pneumonia',
    description:
      'An infection that inflames the air sacs in one or both lungs, which may fill with fluid.',
    treatments: [
      {
        name: 'Antibiotics (for bacterial pneumonia)',
        effectiveness: 90,
        sideEffects: ['Nausea', 'Diarrhea', 'Allergic reactions'],
      },
      {
        name: 'Supportive Care',
        effectiveness: 75,
        sideEffects: ['Minimal'],
      },
    ],
    outlook:
      'Generally good with prompt treatment, but can be life-threatening in severe cases.',
    duration:
      'Can last for several weeks, depending on the severity and type of pneumonia.',
    aggravatingFactors: [
      'Weakened immune system',
      'Underlying lung conditions',
      'Exposure to bacteria or viruses',
    ],
  },
  {
    name: 'Dimorphic hemorrhoids(piles)',
    description:
      'Swollen and inflamed veins in the rectum and anus that can cause discomfort and bleeding.',
    treatments: [
      {
        name: 'Rubber Band Ligation',
        effectiveness: 80,
        sideEffects: ['Pain', 'Bleeding', 'Urinary retention'],
      },
      {
        name: 'Lifestyle Changes and Topical Treatments',
        effectiveness: 65,
        sideEffects: ['Minimal', 'Potential skin irritation'],
      },
    ],
    outlook: 'Generally good with treatment, but recurrence is possible.',
    duration:
      'Varies, some resolve spontaneously while others require treatment.',
    aggravatingFactors: [
      'Constipation',
      'Straining during bowel movements',
      'Pregnancy',
      'Obesity',
    ],
  },
  {
    name: 'Heart attack',
    description:
      'A serious medical emergency in which the blood supply to the heart is suddenly blocked, usually by a blood clot.',
    treatments: [
      {
        name: 'Angioplasty and Stenting',
        effectiveness: 90,
        sideEffects: ['Bleeding', 'Kidney damage', 'Stroke (rare)'],
      },
      {
        name: 'Thrombolytic Therapy',
        effectiveness: 80,
        sideEffects: ['Bleeding', 'Allergic reactions', 'Arrhythmias'],
      },
    ],
    outlook:
      'Varies depending on the extent of heart damage and promptness of treatment.',
    duration: 'Requires immediate medical attention; recovery time varies.',
    aggravatingFactors: [
      'High blood pressure',
      'High cholesterol',
      'Smoking',
      'Diabetes',
      'Family history',
    ],
  },
  {
    name: 'Varicose veins',
    description:
      'Enlarged, twisted veins that commonly appear in the legs and feet.',
    treatments: [
      {
        name: 'Sclerotherapy',
        effectiveness: 80,
        sideEffects: [
          'Skin discoloration',
          'Inflammation',
          'Blood clots (rare)',
        ],
      },
      {
        name: 'Laser Treatment',
        effectiveness: 75,
        sideEffects: ['Skin burns', 'Changes in skin color', 'Pain'],
      },
    ],
    outlook:
      'Can be managed effectively, but may worsen over time if left untreated.',
    duration: 'Chronic condition.',
    aggravatingFactors: [
      'Prolonged standing or sitting',
      'Pregnancy',
      'Family history',
      'Obesity',
    ],
  },
  {
    name: 'Hypothyroidism',
    description:
      "A condition in which the thyroid gland doesn't produce enough thyroid hormone.",
    treatments: [
      {
        name: 'Levothyroxine',
        effectiveness: 95,
        sideEffects: ['Weight loss', 'Anxiety', 'Insomnia'],
      },
      {
        name: 'Natural Desiccated Thyroid',
        effectiveness: 85,
        sideEffects: ['Allergic reactions', 'Headache', 'Insomnia'],
      },
    ],
    outlook: 'Can be effectively managed with hormone replacement therapy.',
    duration: 'Lifelong condition requiring ongoing treatment.',
    aggravatingFactors: [
      'Autoimmune diseases',
      'Iodine deficiency',
      'Thyroid surgery',
      'Radiation therapy',
    ],
  },
  {
    name: 'Hyperthyroidism',
    description:
      'A condition in which the thyroid gland produces too much thyroid hormone.',
    treatments: [
      {
        name: 'Antithyroid Medications',
        effectiveness: 85,
        sideEffects: ['Skin rash', 'Joint pain', 'Liver problems (rare)'],
      },
      {
        name: 'Radioactive Iodine Therapy',
        effectiveness: 90,
        sideEffects: ['Neck soreness', 'Risk of hypothyroidism'],
      },
    ],
    outlook:
      'Can be effectively managed with medication or radioactive iodine therapy.',
    duration: 'Can be temporary or lifelong, depending on the cause.',
    aggravatingFactors: [
      'Autoimmune diseases',
      "Graves' disease",
      'Thyroid nodules',
      'Thyroid cancer',
    ],
  },
  {
    name: 'Hypoglycemia',
    description:
      'A condition characterized by abnormally low blood glucose (sugar) levels.',
    treatments: [
      {
        name: 'Glucose Administration',
        effectiveness: 95,
        sideEffects: ['Temporary increase in blood sugar'],
      },
      {
        name: 'Dietary Changes',
        effectiveness: 80,
        sideEffects: ['Difficulty adapting', 'Potential nutrient imbalances'],
      },
    ],
    outlook:
      'Generally good with prompt treatment, but can be life-threatening if left untreated.',
    duration: 'Can be temporary or chronic, depending on the cause.',
    aggravatingFactors: [
      'Diabetes medication',
      'Skipping meals',
      'Excessive alcohol consumption',
      'Strenuous exercise',
    ],
  },
  {
    name: 'Osteoarthritis',
    description:
      'A type of joint disease that results from breakdown of joint cartilage and underlying bone.',
    treatments: [
      {
        name: 'NSAIDs',
        effectiveness: 70,
        sideEffects: [
          'Stomach upset',
          'Increased bleeding risk',
          'Kidney problems',
        ],
      },
      {
        name: 'Physical Therapy',
        effectiveness: 75,
        sideEffects: ['Temporary pain increase', 'Muscle soreness'],
      },
    ],
    outlook: 'Chronic condition, but symptoms can be managed with treatment.',
    duration: 'Lifelong condition, but severity can fluctuate.',
    aggravatingFactors: ['Age', 'Obesity', 'Joint injury', 'Genetics'],
  },
  {
    name: 'Arthritis',
    description:
      'Inflammation of one or more joints, causing pain and stiffness that can worsen with age.',
    treatments: [
      {
        name: 'Disease-Modifying Antirheumatic Drugs (DMARDs)',
        effectiveness: 80,
        sideEffects: [
          'Increased infection risk',
          'Liver damage',
          'Lung problems',
        ],
      },
      {
        name: 'Corticosteroids',
        effectiveness: 75,
        sideEffects: ['Weight gain', 'Osteoporosis', 'Increased blood sugar'],
      },
    ],
    outlook: 'Varies depending on the type of arthritis and its severity.',
    duration: 'Can be acute or chronic, depending on the type and cause.',
    aggravatingFactors: [
      'Genetics',
      'Autoimmune diseases',
      'Infections',
      'Joint injury',
    ],
  },
  {
    name: '(vertigo) Paroxysmal Positional Vertigo',
    description:
      'A disorder of the inner ear characterized by episodes of dizziness and a sensation of spinning.',
    treatments: [
      {
        name: 'Epley Maneuver',
        effectiveness: 80,
        sideEffects: ['Nausea', 'Temporary increase in vertigo'],
      },
      {
        name: 'Vestibular Rehabilitation',
        effectiveness: 75,
        sideEffects: ['Temporary dizziness', 'Fatigue'],
      },
    ],
    outlook: 'Generally good with treatment, but recurrence is possible.',
    duration: 'Episodes can last from seconds to minutes.',
    aggravatingFactors: [
      'Head position changes',
      'Inner ear infections',
      'Head trauma',
    ],
  },
  {
    name: 'Acne',
    description:
      'A skin condition that occurs when hair follicles become plugged with oil and dead skin cells.',
    treatments: [
      {
        name: 'Topical Retinoids',
        effectiveness: 70,
        sideEffects: [
          'Skin irritation',
          'Increased sun sensitivity',
          'Dryness',
        ],
      },
      {
        name: 'Oral Antibiotics',
        effectiveness: 75,
        sideEffects: [
          'Nausea',
          'Increased sun sensitivity',
          'Yeast infections',
        ],
      },
    ],
    outlook: 'Generally good, but can be a lifelong condition.',
    duration: 'Can persist for years, but severity can fluctuate.',
    aggravatingFactors: [
      'Hormonal changes',
      'Genetics',
      'Stress',
      'Certain medications',
    ],
  },
  {
    name: 'Urinary tract infection',
    description:
      'An infection in any part of the urinary system, including kidneys, bladder, or urethra.',
    treatments: [
      {
        name: 'Antibiotics',
        effectiveness: 95,
        sideEffects: ['Nausea', 'Diarrhea', 'Yeast infections'],
      },
      {
        name: 'Increased Fluid Intake',
        effectiveness: 60,
        sideEffects: ['Minimal'],
      },
    ],
    outlook: 'Generally good with treatment, but recurrence is possible.',
    duration:
      'Symptoms typically resolve within a few days to a week with treatment.',
    aggravatingFactors: [
      'Poor hygiene',
      'Dehydration',
      'Sexual intercourse',
      'Kidney stones',
    ],
  },
  {
    name: 'Psoriasis',
    description:
      "A chronic autoimmune condition that causes the rapid buildup of skin cells, resulting in scaling on the skin's surface.",
    treatments: [
      {
        name: 'Topical Corticosteroids',
        effectiveness: 70,
        sideEffects: ['Skin thinning', 'Easy bruising', 'Stretch marks'],
      },
      {
        name: 'Biologic Drugs',
        effectiveness: 85,
        sideEffects: [
          'Increased infection risk',
          'Injection site reactions',
          'Fatigue',
        ],
      },
    ],
    outlook: 'Chronic condition, but symptoms can be managed with treatment.',
    duration: 'Lifelong condition, but severity can fluctuate.',
    aggravatingFactors: 'Genetics, stress, infections, injuries',
  },
  {
    name: 'Impetigo',
    description:
      'A common and highly contagious skin infection that mainly affects infants and children.',
    treatments: [
      {
        name: 'Topical Antibiotics',
        effectiveness: 85,
        sideEffects: ['Skin irritation', 'Allergic reactions'],
      },
      {
        name: 'Oral Antibiotics',
        effectiveness: 90,
        sideEffects: ['Nausea', 'Diarrhea', 'Yeast infections'],
      },
    ],
    outlook:
      'Generally good with treatment, but can spread easily if left untreated.',
    duration: 'Typically resolves within a few weeks with treatment.',
    aggravatingFactors: [
      'Close contact with infected individuals',
      'Poor hygiene',
      'Breaks in the skin',
    ],
  },
]

const IllnessesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [openCards, setOpenCards] = useState<{ [key: string]: boolean }>({})

  const filteredIllnesses = illnessesData.filter((illness) =>
    illness.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleCard = (index: string) => {
    setOpenCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto md:p-8">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-primary mb-8 md:leading-3">
          Disease Info Hub
        </h1>
        <p className="text-center pb-5">Find your resources here.</p>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for an illness..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-1/2 rounded-md bg-input text-text"
          />
        </div>

        {/* Illness Cards */}
        <motion.div
          initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={spring_transition}
        >
          <div className="flex flex-col gap-8 items-center">
            {filteredIllnesses.map((illness, index) => (
              <div
                key={index}
                className="bg-card text-text p-6 rounded-lg shadow-lg border-2 border-gray-500 w-full md:w-1/2"
              >
                <h2 className="text-2xl font-semibold text-primary text-center mb-4">
                  {illness.name}
                </h2>

                {/* Single Dropdown to Show All Sections */}
                <Button
                  onClick={() => toggleCard(`${index}`)}
                  className="w-full text-left mb-4 p-3 bg-black hover:bg-gray-800 rounded-md text-white"
                >
                  {openCards[`${index}`] ? 'Hide Details' : 'Show Details'}
                </Button>

                {openCards[`${index}`] && (
                  <div className="space-y-4 px-6 text-base">
                    {' '}
                    {/* Set consistent font size */}
                    {/* Description */}
                    <p>
                      <strong>Description:</strong> {illness.description}
                    </p>
                    {/* Treatments */}
                    <div>
                      <strong>Treatments:</strong>
                      <ul className="list-disc pl-6 space-y-2">
                        {illness.treatments.map((treatment, idx) => (
                          <li key={idx}>
                            <strong>{treatment.name}:</strong>{' '}
                            {treatment.effectiveness}% effectiveness
                            <ul className="ml-6 list-inside">
                              {treatment.sideEffects.map(
                                (sideEffect, subIdx) => (
                                  <li key={subIdx}>- {sideEffect}</li>
                                )
                              )}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Outlook */}
                    <p>
                      <strong>Outlook:</strong> {illness.outlook}
                    </p>
                    {/* Duration */}
                    <p>
                      <strong>Duration:</strong> {illness.duration}
                    </p>
                    {/* Aggravating Factors */}
                    <div>
                      <strong>Aggravating Factors:</strong>
                      <ul className="list-disc pl-6 space-y-2">
                        {Array.isArray(illness.aggravatingFactors) ? (
                          illness.aggravatingFactors.map((factor, idx) => (
                            <li key={idx}>{factor}</li>
                          ))
                        ) : (
                          <li>No aggravating factors available.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
export default IllnessesPage
