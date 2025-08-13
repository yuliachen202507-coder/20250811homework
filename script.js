// Tab切換
const tabs = document.querySelectorAll('nav button.tabBtn');
const sections = document.querySelectorAll('main section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// 1. 請購單填寫 - 表單送出
const purchaseRequestForm = document.getElementById('purchaseRequestForm');
const page1Message = document.getElementById('page1Message');

purchaseRequestForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = this.applicantName.value.trim();
  const item = this.itemName.value.trim();
  const quantity = this.quantity.value;
  const budget = this.budget.value;

  if(name && item && quantity > 0 && budget >= 0){
    page1Message.style.color = 'green';
    page1Message.textContent = `感謝 ${name} 的請購申請！您申請了 ${quantity} 個 "${item}"，預算為 ${budget} 元。申請已送出，系統將通知您的主管。`;

    // 模擬新增一筆待審核請購單（簡化）
    const tbody = document.getElementById('purchaseRequestList');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>00${tbody.children.length + 1}</td>
      <td>${name}</td>
      <td class="status">待審核</td>
      <td><button class="approveBtn">同意簽核</button></td>
    `;
    tbody.appendChild(newRow);

    this.reset();
    attachApproveEvent(newRow.querySelector('button.approveBtn'));

    // 送出後切換到下一頁
    switchToTab('page2');
  } else {
    page1Message.style.color = 'red';
    page1Message.textContent = '請完整填寫所有欄位並符合規定。';
  }
});

// 2. 業務主管審核 - 同意簽核按鈕事件
function attachApproveEvent(button){
  button.addEventListener('click', function(){
    const row = this.closest('tr');
    const statusCell = row.querySelector('.status');
    if(statusCell.textContent === '待審核'){
      statusCell.textContent = '已同意';
      this.disabled = true;
      alert(`請購單 ${row.children[0].textContent} 已通過審核，Email已通知相關人員。`);
    }
  });
}

// 初始化業務主管審核按鈕事件
document.querySelectorAll('#purchaseRequestList button.approveBtn').forEach(attachApproveEvent);

// 3. 採購接收請購單
const receivePrBtn = document.getElementById('receivePrBtn');
const page3Message = document.getElementById('page3Message');
receivePrBtn.addEventListener('click', () => {
  page3Message.style.color = 'green';
  page3Message.textContent = '請購單已被採購部門接收，Email已通知業務。';

  // 切換到採購單填寫頁
  switchToTab('page4');
});

// 4. 採購單填寫 - 表單送出
const purchaseOrderForm = document.getElementById('purchaseOrderForm');
const page4Message = document.getElementById('page4Message');
purchaseOrderForm.addEventListener('submit', function(event){
  event.preventDefault();
  const itemName = this.purchaseItemName.value.trim();
  const qty = this.purchaseQuantity.value;
  const amount = this.purchaseAmount.value;

  if(itemName && qty > 0 && amount >= 0){
    page4Message.style.color = 'green';
    page4Message.textContent = `採購單申請已送出，項目：${itemName}，數量：${qty}，金額：${amount}元，Email已通知採購主管。`;
    this.reset();

    // 模擬新增採購單到審核列表
    const tbody = document.getElementById('purchaseOrderList');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>100${tbody.children.length + 1}</td>
      <td>001</td>
      <td class="status">待審核</td>
      <td><button class="approveBtn">同意簽核</button></td>
    `;
    tbody.appendChild(newRow);
    attachApproveEvent(newRow.querySelector('button.approveBtn'));
  } else {
    page4Message.style.color = 'red';
    page4Message.textContent = '請完整填寫所有欄位並符合規定。';
  }
});

// 5. 採購主管審核 - 同意簽核
document.querySelectorAll('#purchaseOrderList button.approveBtn').forEach(attachApproveEvent);

// 6. 採購下單
const procureBtn = document.getElementById('procureBtn');
const page6Message = document.getElementById('page6Message');
const orderStatus = document.getElementById('orderStatus');
procureBtn.addEventListener('click', () => {
  orderStatus.textContent = '已下單';
  page6Message.style.color = 'green';
  page6Message.textContent = '採購已完成，下單通知業務。';
});

// 7. 商品驗收
const goodsArrivedBtn = document.getElementById('goodsArrivedBtn');
const goodsCheckedBtn = document.getElementById('goodsCheckedBtn');
const goodsStatus = document.getElementById('goodsStatus');
const page7Message = document.getElementById('page7Message');

goodsArrivedBtn.addEventListener('click', () => {
  goodsStatus.textContent = '已到貨';
  page7Message.style.color = 'green';
  page7Message.textContent = '商品已到貨，Email已通知相關人員。';
});

goodsCheckedBtn.addEventListener('click', () => {
  goodsStatus.textContent = '驗收通過';
  page7Message.style.color = 'green';
  page7Message.textContent = '商品已驗收通過，Email已通知相關人員。';
});

// 頁籤切換函式
function switchToTab(tabId){
  tabs.forEach(t => t.classList.remove('active'));
  sections.forEach(s => s.classList.remove('active'));

  const targetTab = Array.from(tabs).find(t => t.dataset.tab === tabId);
  if(targetTab) targetTab.classList.add('active');

  const targetSection = document.getElementById(tabId);
  if(targetSection) targetSection.classList.add('active');
}

//增加的段落
document.addEventListener('DOMContentLoaded', () => {
  // 封裝切換頁籤函式 (跟之前提供一樣)
  function switchToTab(tabId){
    const tabs = document.querySelectorAll('nav button.tabBtn');
    const sections = document.querySelectorAll('main section');
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    const targetTab = Array.from(tabs).find(t => t.dataset.tab === tabId);
    if(targetTab) targetTab.classList.add('active');
    const targetSection = document.getElementById(tabId);
    if(targetSection) targetSection.classList.add('active');
  }

  // 監聽請購單送出按鈕 (表單 submit)
  const purchaseRequestForm = document.getElementById('purchaseRequestForm');
  purchaseRequestForm.addEventListener('submit', (e) => {
    // 等原本 submit 完後切換頁籤，為避免衝突，用 setTimeout 延遲執行
    setTimeout(() => {
      switchToTab('page2');
    }, 100); 
  });

  // 監聽接收請購單按鈕點擊
  const receivePrBtn = document.getElementById('receivePrBtn');
  receivePrBtn.addEventListener('click', () => {
    // 延遲切換頁籤，確保原事件先執行完
    setTimeout(() => {
      switchToTab('page4');
    }, 100);
  });
});


