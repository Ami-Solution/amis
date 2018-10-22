export function getHeaders() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  return headers;
}

export function calculationDate(date, current) {
  const d = new Date();
  const month = d.getMonth();
  const year = d.getFullYear();
  let value = {};
  if (current) {
    value = { year, month };
  } else {
    value = {
      year: parseInt(date.split('.')[1]),
      month: parseInt(date.split('.')[0])
    };
  }
  return value;
}

export function getMonthsQuantity(positionList) {
  const workPeriods = positionList.map(p =>
    ({ fromValue: calculationDate(p.from),
      toValue: calculationDate(p.to, p.currentJob)
  }));
  const monthsList = [];
  let quantity = 0;
  for (let year = 2013; year <= 2016; year++) {
    for (let month = 1; month <= 12; month++) {
      let isSelect = false;
      for (const p of workPeriods) {
        if ((p.fromValue.year < year && year < p.toValue.year) ||
          (p.fromValue.year == year && year == p.toValue.year && p.fromValue.month <= month && month <= p.toValue.month) ||
          (p.fromValue.year == year && year < p.toValue.year && p.fromValue.month <= month) ||
          (p.fromValue.year < year && year == p.toValue.year && month <= p.toValue.month)) {
          isSelect = true;
          quantity++;
        }
      }
      monthsList.push({ year, month, isSelect });
    }
  }
  return { monthsList, quantity };
}

export function getMonthtStringByNumber(number) {
  switch (number) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'June';
    case '07':
      return 'July';
    case '08':
      return 'Aug';
    case '09':
      return 'Sept';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
    default:
      return null;
  }
}

export function getSignApplication(positionList, user, isJSON) {
  const newPositionList = [];
  for (let item of positionList) {
    const newItem = {};
    newItem.currentJob = item.isCurrentWork;
    newItem.files = item.files;
    newItem.state = 'READ_ONLY';
    newItem.company = item.companyName;
    newItem.keybase_username = user.keybase_username;
    if (item.isCurrentWork) {
      newItem.endMonth = parseInt(item.to.split('.')[0]);
      newItem.endYear = parseInt(item.to.split('.')[1]);
      newItem.currentJob = true;
    } else {
      const d = new Date();
      newItem.currentJob = false;
      newItem.endMonth = d.getMonth();
      newItem.endYear = d.getFullYear();
    }
    newItem.startMonth = parseInt(item.from.split('.')[0]);
    newItem.startYear = parseInt(item.from.split('.')[1]);
    newItem.notes = `${item.companyName}* ${item.jobTitile}:\n* Reason for leaving:\n\nIn order to verify my employment at
    ${item.companyName}you can contact ${item.confirmerName} who was my <SUPERVISOR/BOSS>. They can be reached 
    via ${item.confirmerEmail} You can verify their position with the company by <INSERT-HOW-TO-VERIFY-THEIR-POSITION>`;
    newPositionList.push(newItem);
  }
  let obj = {
    data: {
      identity: {
        verification_method: 'keybase',
        verification_data: {
          username: user.keybase_username,
          proofs: []
        }
      },
      employmentHistory: {
        jobs: newPositionList
      },
      questions: {
        howLongStay: 1,
        unemploymentPeriod: 0
      },
      requestedPremiumAmount: '238'
    }
  };
  const objJSON = {
    identity: {
      verification_method: 'keybase',
      verification_data: {
        username: user.username,
        proofs: []
      }
    },
    employmentHistory: {
      jobs: newPositionList
    },
    questions: {
      howLongStay: 1,
      unemploymentPeriod: 0
    },
    requestedPremiumAmount: '238'
  };
  if (isJSON) obj = JSON.stringify(objJSON);
  return obj;
}

export function getPolicy(user) {
  let policy = null;
  if (user.policies.length > 0) {
    policy = user.policies[0].id;
  }
  return policy;
}
