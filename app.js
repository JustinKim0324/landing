// 산재路 Landing Page JavaScript - 개선 버전
// 법무법인 선인파트너스

// ============================================
// 설정: Google Forms URL (실제 Forms URL로 교체하세요)
// ============================================
const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
const FORM_ENTRY_IDS = {
  name: 'entry.123456789',      // 실제 entry ID로 교체
  phone: 'entry.987654321',     // 실제 entry ID로 교체
  content: 'entry.456789123',   // 실제 entry ID로 교체
  timestamp: 'entry.147258369'  // 실제 entry ID로 교체
};

// Test data structure (기존과 동일)
const testData = {
  musculoskeletal: {
    title: "근골격계 질환",
    subcategories: {
      "목 (경추추간판탈출증 등)": [
        {
          q: "컴퓨터, 스마트폰, 운전, 조립/용접 등<br>목에 부담이 가는 업무를 총 5년 이상 하셨나요?",
          p: "공단은 질병과 업무의 연관성을 판단할 때, 총 업무 기간(직업력)을<br>중요한 기준으로 봅니다. 장기간의 부담이 목에 누적되었는지 확인합니다.",
          weight: 0.4, // 가중치 추가
          yesText: "장기간 목에 부담이 누적된 직업력은 업무관련성을 주장할 수 있는 핵심적인 근거입니다.",
          noText: "업무 기간이 짧다면, 단기간에 업무 부담이 급격히 증가했다는 점을 집중적으로 입증해야 합니다."
        }
      ],
      "어깨·상완 (회전근개파열 등)": [
        {
          q: "팔을 어깨 높이 위로 들어 올리는 동작이 많은<br>도장공, 용접공, 목수, 항공기 정비사 등의 직업력이 총 5년 이상인가요?",
          p: "공단은 어깨 질환과 관련하여 특히 팔을 위로 드는(거상) 작업의<br>총 기간(직업력)을 중요한 판단 기준으로 봅니다.",
          weight: 0.4,
          yesText: "장기간 팔을 들어 올리는 작업을 수행한 직업력은 어깨 질환의 업무관련성을 주장하는 핵심 근거입니다.",
          noText: "업무 기간이 짧다면, 단기간에 어깨에 충격을 받았거나(사고) 업무 강도가 매우 높았음을 집중적으로 입증해야 합니다."
        }
      ],
      "팔꿈치 (테니스엘보우 등)": [
        {
          q: "반복적인 손목 사용이나 무거운 물건을 드는 작업을<br>총 3년 이상 지속적으로 수행하셨나요?",
          p: "팔꿈치 질환은 반복적인 동작이나 과도한 힘 사용으로 인한<br>누적 손상이 주요 원인으로 판단됩니다.",
          weight: 0.35,
          yesText: "반복적인 팔꿈치 사용은 테니스엘보우 등의 주요 원인으로 인정받을 수 있습니다.",
          noText: "단기간이라도 급격한 업무량 증가나 특별한 사고가 있었다면 그 점을 강조해야 합니다."
        }
      ],
      "손목 (수근관증후군 등)": [
        {
          q: "키보드 타이핑, 포장작업, 청소 등<br>손목을 반복 사용하는 업무를 총 3년 이상 하셨나요?",
          p: "손목 질환은 반복적인 손목 사용으로 인한 누적 손상이<br>주요 원인으로 평가됩니다.",
          weight: 0.35,
          yesText: "장기간 반복적인 손목 사용은 수근관증후군의 주요 원인으로 인정받을 수 있습니다.",
          noText: "업무 기간이 짧다면, 급격한 업무 강도 증가나 특별한 사고 등을 입증해야 합니다."
        }
      ]
    }
  },
  accident: {
    title: "업무상 사고",
    subcategories: {
      "넘어지거나 떨어짐 (추락, 전도)": [
        {
          q: "사업주가 관리하는 사업장 내에서<br>업무를 수행하던 중에 사고가 발생했나요?",
          p: "산재 인정의 가장 기본적인 요건은 '업무 수행성'입니다.<br>사고 당시 사업주의 지배·관리하에 업무를 수행 중이었는지 확인합니다.",
          weight: 0.5,
          yesText: "사업장 내에서 업무 중 발생한 사고는 업무관련성을 입증하는 데 있어 가장 기본적인 요건을 충족합니다.",
          noText: "사업장 밖이라도, 출장 등 사업주의 지시를 받아 업무를 수행하던 중 발생한 사고는 업무상 재해로 인정될 수 있습니다."
        }
      ],
      "끼임·부딪힘": [
        {
          q: "기계나 장비 사용 중 또는 작업 중<br>끼임이나 부딪힘 사고가 발생했나요?",
          p: "업무상 기계나 장비 사용 중 발생한 사고는<br>업무관련성이 명확한 경우가 대부분입니다.",
          weight: 0.5,
          yesText: "업무상 기계나 장비 관련 사고는 명확한 업무상 재해로 인정받을 가능성이 높습니다.",
          noText: "작업과 관련 없는 개인적 행동 중 사고라면 업무관련성 입증이 어려울 수 있습니다."
        }
      ]
    }
  },
  cerebrovascular: {
    title: "뇌심혈관계 질환",
    subcategories: {
      "뇌출혈·뇌경색": [
        {
          q: "발병 전 12주 동안 평소보다 업무량이<br>30% 이상 증가하거나 과로한 적이 있나요?",
          p: "뇌심혈관계 질환은 급성 과로나 만성적인 과로가<br>주요 원인으로 평가됩니다.",
          weight: 0.45,
          yesText: "발병 전 급격한 업무량 증가는 뇌심혈관계 질환의 주요 원인으로 인정받을 수 있습니다.",
          noText: "급성 과로가 없었다면 만성적인 과로나 스트레스 요인을 찾아 입증해야 합니다."
        }
      ],
      "심근경색": [
        {
          q: "발병 전 24시간 내에 업무와 관련된<br>급격한 스트레스나 과로가 있었나요?",
          p: "심근경색은 급성 스트레스나 과로와<br>직접적인 연관성이 높은 질환입니다.",
          weight: 0.45,
          yesText: "급성 스트레스나 과로는 심근경색의 직접적 원인으로 인정받을 가능성이 높습니다.",
          noText: "급성 요인이 없다면 만성적인 업무 스트레스나 과로 패턴을 입증해야 합니다."
        }
      ]
    }
  },
  mental_illness: {
    title: "정신질환",
    subcategories: {
      "우울증·적응장애": [
        {
          q: "직장 내 괴롭힘, 성희롱, 폭언 등<br>정신적 충격을 받은 사건이 있었나요?",
          p: "정신질환은 업무상 스트레스나 충격적 사건과<br>직접적인 연관성이 입증되어야 합니다.",
          weight: 0.4,
          yesText: "직장 내 괴롭힘이나 충격적 사건은 정신질환의 주요 원인으로 인정받을 수 있습니다.",
          noText: "명확한 사건이 없다면 업무량 증가나 업무 환경 변화 등을 통해 입증해야 합니다."
        }
      ],
      "외상후스트레스장애(PTSD)": [
        {
          q: "업무 중 생명을 위협하는 사고나<br>극심한 충격을 받은 사건을 경험하셨나요?",
          p: "PTSD는 업무상 극심한 충격 사건과<br>직접적인 연관성이 필요합니다.",
          weight: 0.5,
          yesText: "업무상 충격적 사건 경험은 PTSD의 직접적 원인으로 인정받을 가능성이 높습니다.",
          noText: "직접적인 사건이 없다면 간접적 노출이나 업무 스트레스를 통한 입증이 필요합니다."
        }
      ]
    }
  },
  occupational_cancer: {
    title: "직업성 암",
    subcategories: {
      "폐암": [
        {
          q: "석면, 규소, 코크스 등<br>발암물질에 10년 이상 노출된 적이 있나요?",
          p: "직업성 암은 장기간의 발암물질 노출이<br>주요 원인으로 평가됩니다.",
          weight: 0.45,
          yesText: "장기간 발암물질 노출은 직업성 암의 주요 근거로 인정받을 수 있습니다.",
          noText: "단기간이라도 고농도 노출이나 복합적 요인이 있다면 전문가 상담이 필요합니다."
        }
      ]
    }
  },
  respiratory_disease: {
    title: "호흡기 질환",
    subcategories: {
      "진폐증": [
        {
          q: "분진이 많은 환경에서<br>5년 이상 작업하신 경험이 있나요?",
          p: "진폐증은 분진 흡입으로 인한 폐 손상이<br>주요 원인입니다.",
          weight: 0.4,
          yesText: "장기간 분진 노출은 진폐증의 주요 원인으로 인정받을 수 있습니다.",
          noText: "단기간이라도 고농도 분진 노출이 있었다면 검사가 필요합니다."
        }
      ]
    }
  },
  noise_vibration: {
    title: "소음성 난청, 진동장해",
    subcategories: {
      "소음성 난청": [
        {
          q: "85dB 이상의 소음 환경에서<br>3년 이상 작업하셨나요?",
          p: "소음성 난청은 지속적인 소음 노출로 인한<br>청력 손상입니다.",
          weight: 0.35,
          yesText: "장기간 소음 노출은 소음성 난청의 주요 원인으로 인정받을 수 있습니다.",
          noText: "단기간이라도 매우 높은 소음에 노출되었다면 검사가 필요합니다."
        }
      ]
    }
  },
  commute: {
    title: "출퇴근 재해",
    subcategories: {
      "교통사고": [
        {
          q: "출퇴근 중 합리적 경로에서<br>교통사고가 발생했나요?",
          p: "출퇴근 재해는 합리적 경로와 방법으로<br>통근 중 발생해야 인정됩니다.",
          weight: 0.45,
          yesText: "합리적 출퇴근 경로의 사고는 출퇴근 재해로 인정받을 수 있습니다.",
          noText: "우회 경로라도 부득이한 사정이 있었다면 상담이 필요합니다."
        }
      ]
    }
  },
  worker_status: {
    title: "근로자성 다툼",
    subcategories: {
      "특수고용직": [
        {
          q: "업무 지시를 받고 정해진 시간에<br>일정한 장소에서 근무하셨나요?",
          p: "근로자성 인정은 실질적인 지휘·감독 관계와<br>업무의 종속성이 핵심입니다.",
          weight: 0.4,
          yesText: "실질적 지휘·감독을 받았다면 근로자로 인정받을 가능성이 높습니다.",
          noText: "형식적으로는 자영업자라도 실질적 관계를 살펴봐야 합니다."
        }
      ]
    }
  }
};

// Global state
let currentTestState = {
  step: 'category',
  selectedCategory: null,
  selectedSubcategory: null,
  currentQuestionIndex: 0,
  answers: [],
  questions: []
};

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  
  initTestSystem();
  initCalculator();
  initConsultationModal();
  initPhoneFormatting();
  initScrollAnimations();
  initScrollHeader();
  initLiveCounter();
  
  console.log('All functions initialized');
});

// ============================================
// 실시간 카운터 (심리적 효과)
// ============================================
function initLiveCounter() {
  const liveCountEl = document.getElementById('liveCount');
  if (!liveCountEl) return;
  
  // 랜덤 시작 숫자 (12-28 사이)
  let count = Math.floor(Math.random() * 17) + 12;
  liveCountEl.textContent = count;
  
  // 5-15초마다 랜덤하게 숫자 변경
  setInterval(() => {
    const change = Math.random() > 0.5 ? 1 : -1;
    count = Math.max(10, Math.min(35, count + change));
    liveCountEl.textContent = count;
  }, Math.random() * 10000 + 5000);
}

// ============================================
// 스크롤 시 헤더 배경 변경
// ============================================
function initScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ============================================
// Test System Functions
// ============================================
function initTestSystem() {
  console.log('Initializing test system');
  
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      selectCategory(category);
    });
  });

  const backToCategory = document.getElementById('backToCategory');
  const backToSubcategory = document.getElementById('backToSubcategory');
  const restartTest = document.getElementById('restartTest');

  if (backToCategory) {
    backToCategory.addEventListener('click', () => showStep('category'));
  }
  
  if (backToSubcategory) {
    backToSubcategory.addEventListener('click', () => showStep('subcategory'));
  }
  
  if (restartTest) {
    restartTest.addEventListener('click', resetTest);
  }

  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  
  if (yesBtn) {
    yesBtn.addEventListener('click', () => answerQuestion(true));
  }
  
  if (noBtn) {
    noBtn.addEventListener('click', () => answerQuestion(false));
  }

  console.log('Test system initialized');
}

function selectCategory(categoryKey) {
  console.log('Selected category:', categoryKey);
  
  currentTestState.selectedCategory = categoryKey;
  currentTestState.step = 'subcategory';
  
  showSubcategories(categoryKey);
}

function showSubcategories(categoryKey) {
  const category = testData[categoryKey];
  if (!category) {
    console.error('Category not found:', categoryKey);
    return;
  }

  const subcategoryList = document.getElementById('subcategoryList');
  if (!subcategoryList) {
    console.error('Subcategory list element not found');
    return;
  }

  subcategoryList.innerHTML = '';

  Object.keys(category.subcategories).forEach(subcategoryName => {
    const item = document.createElement('div');
    item.className = 'subcategory-item';
    item.innerHTML = `<h4>${subcategoryName}</h4>`;
    
    item.addEventListener('click', function() {
      selectSubcategory(categoryKey, subcategoryName);
    });
    
    subcategoryList.appendChild(item);
  });

  showStep('subcategory');
}

function selectSubcategory(categoryKey, subcategoryName) {
  console.log('Selected subcategory:', subcategoryName);
  
  currentTestState.selectedSubcategory = subcategoryName;
  currentTestState.questions = testData[categoryKey].subcategories[subcategoryName] || [];
  currentTestState.currentQuestionIndex = 0;
  currentTestState.answers = [];
  currentTestState.step = 'questions';
  
  showCurrentQuestion();
}

function showCurrentQuestion() {
  if (currentTestState.currentQuestionIndex >= currentTestState.questions.length) {
    calculateAndShowResult();
    return;
  }

  const question = currentTestState.questions[currentTestState.currentQuestionIndex];
  
  const currentQuestionEl = document.getElementById('currentQuestion');
  const totalQuestionsEl = document.getElementById('totalQuestions');
  
  if (currentQuestionEl) currentQuestionEl.textContent = currentTestState.currentQuestionIndex + 1;
  if (totalQuestionsEl) totalQuestionsEl.textContent = currentTestState.questions.length;

  const questionPurpose = document.getElementById('questionPurpose');
  const questionText = document.getElementById('questionText');
  
  if (questionPurpose) questionPurpose.innerHTML = question.p;
  if (questionText) questionText.innerHTML = question.q;

  const feedbackEl = document.getElementById('questionFeedback');
  if (feedbackEl) {
    feedbackEl.classList.remove('show');
  }

  showStep('questions');
}

function answerQuestion(answer) {
  const question = currentTestState.questions[currentTestState.currentQuestionIndex];
  
  currentTestState.answers.push({
    question: question.q,
    answer: answer,
    weight: question.weight || 0.3
  });

  const feedbackEl = document.getElementById('questionFeedback');
  if (feedbackEl) {
    feedbackEl.innerHTML = answer ? question.yesText : question.noText;
    feedbackEl.classList.add('show');
  }

  setTimeout(() => {
    currentTestState.currentQuestionIndex++;
    showCurrentQuestion();
  }, 2000);
}

function calculateAndShowResult() {
  // 가중치 기반 점수 계산
  const totalWeight = currentTestState.answers.reduce((sum, answer) => sum + answer.weight, 0);
  const yesWeight = currentTestState.answers.reduce((sum, answer) => {
    return sum + (answer.answer ? answer.weight : 0);
  }, 0);
  
  const percentage = totalWeight > 0 ? (yesWeight / totalWeight) * 100 : 0;

  let resultType, resultIcon, resultTitle, resultDescription;

  if (percentage >= 65) {
    resultType = 'high';
    resultIcon = '✅';
    resultTitle = '승인 가능성이 높습니다';
    resultDescription = '답변 내용을 종합해 본 결과, 산재 승인 가능성이 높은 것으로 판단됩니다. 법무법인 선인파트너스의 전문가와 상담을 통해 구체적인 신청 절차를 진행해보세요.';
  } else if (percentage >= 35) {
    resultType = 'medium';
    resultIcon = '⚠️';
    resultTitle = '전문가 상담이 필요합니다';
    resultDescription = '산재 승인을 위해서는 추가적인 근거 자료나 전문적인 검토가 필요한 상황입니다. 15년 경력의 산재 전문 노무사·변호사와 상담하여 승인 가능성을 높여보세요.';
  } else {
    resultType = 'low';
    resultIcon = '📋';
    resultTitle = '추가 정보 확인이 필요합니다';
    resultDescription = '현재 상황만으로는 산재 승인이 어려울 수 있습니다. 하지만 놓친 부분이나 추가 증거가 있을 수 있으니, 법무법인 선인파트너스의 전문가 상담을 받아보시기 바랍니다.';
  }

  const resultStep = document.getElementById('resultStep');
  const resultIconEl = document.getElementById('resultIcon');
  const resultTitleEl = document.getElementById('resultTitle');
  const resultDescriptionEl = document.getElementById('resultDescription');

  if (resultIconEl) resultIconEl.textContent = resultIcon;
  if (resultTitleEl) resultTitleEl.textContent = resultTitle;
  if (resultDescriptionEl) resultDescriptionEl.textContent = resultDescription;

  if (resultStep) {
    resultStep.className = `test__step result-${resultType}`;
  }

  currentTestState.step = 'result';
  showStep('result');
}

function showStep(stepName) {
  const steps = ['categoryStep', 'subcategoryStep', 'questionStep', 'resultStep'];
  
  steps.forEach(step => {
    const element = document.getElementById(step);
    if (element) {
      if (step === stepName + 'Step') {
        element.classList.remove('test-step-hidden');
      } else {
        element.classList.add('test-step-hidden');
      }
    }
  });
}

function resetTest() {
  currentTestState = {
    step: 'category',
    selectedCategory: null,
    selectedSubcategory: null,
    currentQuestionIndex: 0,
    answers: [],
    questions: []
  };
  
  showStep('category');
}

// ============================================
// Calculator functionality
// ============================================
function initCalculator() {
  const calculateBtn = document.getElementById('calculateBtn');
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      console.log('Calculate button clicked');
      performCalculation();
    });
    console.log('Calculate button event attached');
  } else {
    console.error('Calculate button not found');
  }
}

function performCalculation() {
  console.log('Starting calculation...');
  
  const ageInput = document.getElementById('age');
  const salaryInput = document.getElementById('salary');
  const injuryTypeSelect = document.getElementById('injuryType');
  const disabilityGradeSelect = document.getElementById('disabilityGrade');
  
  if (!ageInput || !salaryInput || !injuryTypeSelect || !disabilityGradeSelect) {
    console.error('Form elements not found');
    alert('계산 폼을 찾을 수 없습니다.');
    return;
  }
  
  const age = parseInt(ageInput.value);
  const salary = parseInt(salaryInput.value);
  const injuryType = injuryTypeSelect.value;
  const disabilityGrade = parseInt(disabilityGradeSelect.value);
  
  console.log('Form values:', { age, salary, injuryType, disabilityGrade });
  
  if (!age || age < 18 || age > 80) {
    alert('나이는 18세 이상 80세 이하로 입력해주세요.');
    ageInput.focus();
    return;
  }
  
  if (!salary || salary < 100 || salary > 2000) {
    alert('월 평균임금은 100만원 이상 2000만원 이하로 입력해주세요.');
    salaryInput.focus();
    return;
  }
  
  if (!injuryType) {
    alert('부상 정도를 선택해주세요.');
    injuryTypeSelect.focus();
    return;
  }
  
  if (!disabilityGrade || disabilityGrade < 1 || disabilityGrade > 14) {
    alert('장해등급을 선택해주세요.');
    disabilityGradeSelect.focus();
    return;
  }
  
  console.log('Validation passed, calculating...');
  
  const result = calculateCompensation(salary, injuryType, disabilityGrade);
  console.log('Calculation result:', result);
  
  showCalculationResult(result);
}

function calculateCompensation(salary, injuryType, grade) {
  const monthlyWage = salary * 10000;
  const dailyWage = monthlyWage / 30;
  
  const disabilityRates = {
    1: 329, 2: 315, 3: 300, 4: 285, 5: 270,
    6: 255, 7: 241, 8: 226, 9: 212, 10: 197,
    11: 183, 12: 168, 13: 154, 14: 139
  };
  
  const disabilityDays = disabilityRates[grade] || 139;
  const disabilityBenefit = Math.round(dailyWage * disabilityDays);
  
  const treatmentCosts = {
    'minor': 500000,
    'moderate': 2000000,
    'serious': 5000000
  };
  
  const treatmentCost = treatmentCosts[injuryType] || 500000;
  
  const sickLeaveDaysMap = {
    'minor': 30,
    'moderate': 90,
    'serious': 180
  };
  
  const sickLeaveDays = sickLeaveDaysMap[injuryType] || 30;
  const sickLeaveBenefit = Math.round(dailyWage * 0.7 * sickLeaveDays);
  
  const totalCompensation = disabilityBenefit + treatmentCost + sickLeaveBenefit;
  
  return {
    disabilityBenefit,
    treatmentCost,
    sickLeaveBenefit,
    totalCompensation
  };
}

function showCalculationResult(result) {
  console.log('Showing calculation result:', result);
  
  const calculatorResult = document.getElementById('calculatorResult');
  const resultAmount = document.getElementById('resultAmount');
  const resultBreakdown = document.getElementById('resultBreakdown');
  
  if (!calculatorResult || !resultAmount || !resultBreakdown) {
    console.error('Result elements not found');
    alert('결과 표시 영역을 찾을 수 없습니다.');
    return;
  }
  
  function formatWon(amount) {
    return amount.toLocaleString('ko-KR') + '원';
  }
  
  resultAmount.textContent = formatWon(result.totalCompensation);
  
  resultBreakdown.innerHTML = `
    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;">
      <span>장해급여:</span> <strong style="color: #059669;">${formatWon(result.disabilityBenefit)}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;">
      <span>치료비:</span> <strong style="color: #059669;">${formatWon(result.treatmentCost)}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;">
      <span>휴업급여:</span> <strong style="color: #059669;">${formatWon(result.sickLeaveBenefit)}</strong>
    </div>
    <div style="display: flex; justify-content: space-between; padding: 12px 0; font-weight: 600; color: #1e3a8a; font-size: 16px;">
      <span>총 예상 보상금:</span> <strong>${formatWon(result.totalCompensation)}</strong>
    </div>
  `;
  
  calculatorResult.classList.remove('calculator-result-hidden');
  calculatorResult.classList.add('show');
  
  calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  console.log('Result displayed successfully');
}

// ============================================
// Modal functionality
// ============================================
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  const consultationBtns = document.querySelectorAll('.consultation-btn');
  const closeBtn = document.getElementById('closeModal');
  const form = document.getElementById('consultationForm');
  
  console.log('Found consultation buttons:', consultationBtns.length);
  
  consultationBtns.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      console.log(`Consultation button ${index} clicked`);
      openModal();
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      console.log('Close button clicked');
      closeModal();
    });
  }
  
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      handleFormSubmission();
    });
  }
  
  console.log('Modal events attached');
}

function openModal() {
  const modal = document.getElementById('consultationModal');
  if (modal) {
    modal.classList.remove('modal-hidden');
    document.body.style.overflow = 'hidden';
    
    const firstInput = modal.querySelector('#userName');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
    
    console.log('Modal opened');
  }
}

function closeModal() {
  const modal = document.getElementById('consultationModal');
  if (modal) {
    modal.classList.add('modal-hidden');
    document.body.style.overflow = '';
    
    const form = document.getElementById('consultationForm');
    if (form) {
      form.reset();
    }
    
    console.log('Modal closed');
  }
}

// ============================================
// Form Submission with Google Forms
// ============================================
async function handleFormSubmission() {
  const userName = document.getElementById('userName').value.trim();
  const userPhone = document.getElementById('userPhone').value.trim();
  const consultationContent = document.getElementById('consultationContent').value.trim();
  const privacyAgree = document.getElementById('privacyAgree').checked;
  
  // Validation
  if (!userName) {
    alert('이름을 입력해주세요.');
    document.getElementById('userName').focus();
    return;
  }
  
  if (!userPhone) {
    alert('휴대폰번호를 입력해주세요.');
    document.getElementById('userPhone').focus();
    return;
  }
  
  // 전화번호 형식 검증
  const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  if (!phoneRegex.test(userPhone)) {
    alert('올바른 휴대폰번호 형식이 아닙니다.\n(예: 010-1234-5678)');
    document.getElementById('userPhone').focus();
    return;
  }
  
  if (!privacyAgree) {
    alert('개인정보처리방침에 동의해주세요.');
    return;
  }
  
  const submitBtn = document.querySelector('#consultationForm button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = '신청 중...';
  
  try {
    // Google Forms로 데이터 전송
    const formData = new FormData();
    formData.append(FORM_ENTRY_IDS.name, userName);
    formData.append(FORM_ENTRY_IDS.phone, userPhone);
    formData.append(FORM_ENTRY_IDS.content, consultationContent || '내용 없음');
    formData.append(FORM_ENTRY_IDS.timestamp, new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
    
    // Google Forms로 전송 (no-cors 모드)
    await fetch(GOOGLE_FORMS_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    // 로컬 스토리지에도 백업 저장
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    consultations.push({
      userName,
      userPhone,
      consultationContent,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('consultations', JSON.stringify(consultations));
    
    // 성공 메시지
    alert(`${userName}님의 상담 신청이 완료되었습니다!\n\n법무법인 선인파트너스의 산재 전문 노무사·변호사가\n평균 2시간 이내에 연락드리겠습니다.\n\n📞 회신 가능 시간: 평일 09시~21시`);
    
    closeModal();
    
    console.log('Consultation submitted:', { userName, userPhone, consultationContent });
    
  } catch (error) {
    console.error('Error:', error);
    alert('신청 중 오류가 발생했습니다.\n\n직접 전화 주시면 즉시 상담해드립니다.\n📞 02-XXXX-XXXX');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// ============================================
// Phone formatting
// ============================================
function initPhoneFormatting() {
  const phoneInput = document.getElementById('userPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/[^\d]/g, '');
      
      if (value.length <= 3) {
        e.target.value = value;
      } else if (value.length <= 7) {
        e.target.value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
      } else {
        e.target.value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
      }
    });
    console.log('Phone formatting attached');
  }
}

// ============================================
// Scroll animations
// ============================================
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  console.log('Scroll animations initialized');
}

// ============================================
// Keyboard shortcuts
// ============================================
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('consultationModal');
    if (modal && !modal.classList.contains('modal-hidden')) {
      closeModal();
    }
  }
});

// ============================================
// Global error handling
// ============================================
window.addEventListener('error', function(e) {
  console.error('Error occurred:', e.error);
});

// ============================================
// 페이지 로드 완료 로그
// ============================================
console.log('산재路 Landing Page - 법무법인 선인파트너스');
console.log('JavaScript file loaded successfully');
