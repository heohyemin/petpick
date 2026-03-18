/* ========================================= 
   1. 데이터 베이스
   ========================================= */
const hospitalData = [
    { id: 1, name: '강남 플러스 동물병원', category: '🏥 동물병원', hasHotel: true, isPartner: true, requestCount: 0, addr: '서울특별시 강남구 역삼동 123-45', time: '09:00 - 22:00', holiday: '매주 일요일 휴무', distance: '300m', rating: 4.9, reviews: 1245, isOpen: true, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', desc: '정직한 진료를 약속하는 동물병원입니다.', links: { homepage: '#', instagram: '#' }, bookingUrl: 'https://booking.naver.com', reviewList: [{ user: '초코언니', star: 5, text: '선생님이 너무 친절해요!' }] },
    { id: 2, name: '역삼 24시 메디컬센터', category: '🏥 동물병원', hasHotel: false, isPartner: false, requestCount: 156, addr: '서울특별시 강남구 도곡동 789-10', time: '00:00 - 24:00', holiday: '연중무휴', distance: '1.2km', rating: 4.8, reviews: 850, isOpen: true, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', desc: '응급 전문 대형 병원입니다.', links: { homepage: '#' }, reviewList: [{ user: '나비맘', star: 5, text: '야간에도 든든해요.' }] },
    { id: 3, name: '뽀송 애견미용 살롱', category: '✂️ 애견미용', hasHotel: true, isPartner: true, requestCount: 0, addr: '서울특별시 강남구 역삼동 55-6', time: '10:00 - 19:00', holiday: '매주 월요일 휴무', distance: '600m', rating: 5.0, reviews: 420, isOpen: true, img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400', desc: '가위컷 전문 프리미엄 미용실.', links: { instagram: '#' }, bookingUrl: 'https://m.place.naver.com', reviewList: [{ user: '별이언니', star: 5, text: '미용 맛집!' }] },
    { id: 4, name: '몽글 펫 아카데미', category: '🏫 유치원 • 훈련소', hasHotel: true, isPartner: true, requestCount: 0, addr: '서울특별시 서초구 서초동 11-2', time: '08:00 - 20:00', holiday: '주말 휴무', distance: '2.5km', rating: 4.7, reviews: 156, isOpen: true, img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', desc: '아이들의 사회성을 길러주는 유치원.', links: { homepage: '#' }, reviewList: [{ user: '비숑집사', star: 5, text: '선생님들이 좋아요.' }] },
    { id: 5, name: '카페 멍글몽글', category: '🚗 여행', hasHotel: false, isPartner: true, requestCount: 0, addr: '경기도 용인시 기흥구 77', time: '11:00 - 21:00', holiday: '매주 화요일 휴무', distance: '15km', rating: 4.9, reviews: 312, isOpen: true, img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400', desc: '운동장이 넓은 펫카페.', links: { homepage: '#', instagram: '#' }, bookingUrl: 'https://m.place.naver.com', reviewList: [{ user: '라떼네', star: 5, text: '커피도 맛있고 운동장이 넓어요!' }] }
];

let petData = { choco: { name: '초코', breed: '토이 푸들', age: '4세', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150' }, nabi: { name: '나비', breed: '코리안 숏헤어', age: '2세', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150' } };
let currentPetId = 'choco'; let isEditMode = false;

window.onload = function() { setTimeout(() => document.getElementById('splashScreen').classList.add('hidden'), 1500); renderHospitals(); startAdSlider(); initAdSwipe(); initDragScroll(); initPetCardSwitch(); };

// [함수] 장소 상세 열기 (데이터 바인딩 및 정렬 보완)
function openHospitalDetail(id) {
    const h = hospitalData.find(item => item.id === id); if (!h) return;
    document.getElementById('detail-h-name').innerText = h.name;
    document.getElementById('detail-h-category').innerText = h.category;
    document.getElementById('detail-h-rating').innerText = h.rating;
    document.getElementById('detail-h-reviews').innerText = `리뷰 ${h.reviews.toLocaleString()}`;
    document.getElementById('detail-h-distance').innerText = h.distance;
    document.getElementById('detail-h-addr').innerText = h.addr;
    document.getElementById('detail-h-time').innerText = h.time;
    document.getElementById('detail-h-holiday').innerText = h.holiday;
    document.getElementById('detail-h-desc').innerText = h.desc;
    document.getElementById('detail-h-img').style.background = `url('${h.img}') center/cover`;
    
    document.getElementById('detail-h-hotel').style.display = h.hasHotel ? 'inline-flex' : 'none';
    const badge = document.getElementById('detail-h-status-badge');
    badge.className = h.isOpen ? 'status-badge open' : 'status-badge closed';
    document.getElementById('detail-h-status-text').innerText = h.isOpen ? '영업중' : '영업종료';

    const linksElem = document.getElementById('detail-h-links');
    let linksHtml = '';
    if(h.links.homepage) linksHtml += `<a href="${h.links.homepage}" target="_blank" class="link-icon-btn"><span class="material-symbols-outlined">language</span>웹</a>`;
    if(h.links.instagram) linksHtml += `<a href="${h.links.instagram}" target="_blank" class="link-icon-btn"><span class="material-symbols-outlined">camera_alt</span>SNS</a>`;
    linksElem.innerHTML = linksHtml || '<span style="color:#ccc; font-size:12px;">정보 없음</span>';

    const bookingBtn = document.getElementById('detail-h-booking-btn');
    if (h.isPartner) {
        bookingBtn.className = 'detail-action-btn';
        bookingBtn.innerHTML = `<span class="material-symbols-outlined">calendar_month</span> 예약하기`;
        bookingBtn.onclick = () => { if(h.bookingUrl) window.open(h.bookingUrl, '_blank'); else showToast('예약 시스템 준비 중입니다.'); };
    } else {
        bookingBtn.className = 'detail-action-btn intro-btn';
        bookingBtn.innerHTML = `도입하기 (${h.requestCount})`;
        bookingBtn.onclick = () => { h.requestCount++; bookingBtn.innerHTML = `도입하기 (${h.requestCount})`; showToast('도입 요청 전송 완료!'); };
    }

    const rList = document.getElementById('detail-h-review-list');
    rList.innerHTML = h.reviewList.map(r => `<div class="review-card"><div class="review-user"><span class="user-name">${r.user}</span><span style="color:var(--star-yellow); font-weight:700; font-size:12px;">★ ${r.star}</span></div><p class="review-content">${r.text}</p></div>`).join('');
    
    openSubPage('hospital-detail');
    document.querySelector('#page-hospital-detail .sub-content').scrollTop = 0;
}

// [함수] 반려동물 상세 정보
function openPetDetail(petId) {
    currentPetId = petId; const pet = petData[petId]; if(!pet) return;
    document.getElementById('detail-img').src = pet.img; document.getElementById('detail-title-name').innerText = pet.name;
    document.getElementById('view-name').innerText = pet.name; document.getElementById('view-breed').innerText = pet.breed;
    document.getElementById('view-age').innerText = pet.age; document.getElementById('edit-name').value = pet.name;
    document.getElementById('edit-breed').value = pet.breed; document.getElementById('edit-age').value = pet.age;
    openSubPage('pet-detail');
}

function toggleEditMode() {
    const btn = document.getElementById('editBtn');
    if (!isEditMode) { 
        isEditMode = true; btn.innerText = '저장'; 
        document.querySelectorAll('.view-mode').forEach(v => v.classList.add('hidden-mode')); 
        document.querySelectorAll('.edit-mode').forEach(e => e.classList.remove('hidden-mode')); 
    } else { 
        petData[currentPetId].name = document.getElementById('edit-name').value;
        petData[currentPetId].breed = document.getElementById('edit-breed').value;
        petData[currentPetId].age = document.getElementById('edit-age').value;
        
        // 메인 화면 이름 업데이트 (id 확인 후 실행)
        const homeNameEl = document.getElementById('name-' + currentPetId);
        if(homeNameEl) homeNameEl.innerText = petData[currentPetId].name;
        
        document.getElementById('detail-title-name').innerText = petData[currentPetId].name;
        isEditMode = false; btn.innerText = '수정'; 
        document.querySelectorAll('.view-mode').forEach(v => v.classList.remove('hidden-mode')); 
        document.querySelectorAll('.edit-mode').forEach(e => e.classList.add('hidden-mode')); 
        showToast('수정되었습니다.'); 
    }
}

// [UI 제어]
function openSubPage(pageId) {
    document.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) { target.classList.add('active'); document.getElementById('mainHome').style.display = 'none'; document.getElementById('mainHeader').style.display = 'none'; }
}
function closeSubPage() {
    document.querySelectorAll('.sub-page').forEach(p => p.classList.remove('active'));
    document.getElementById('mainHome').style.display = 'block'; document.getElementById('mainHeader').style.display = 'flex';
}
function openModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.classList.add('active'); 
}
function closeModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.classList.remove('active'); 
}
function setLoc(n) { document.getElementById('locDisplay').innerText = n; closeModal('locationModal'); showToast(n + ' 설정'); }
function copyAddress() { const addr = document.getElementById('detail-h-addr').innerText; const t = document.createElement('textarea'); t.value = addr; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); showToast('복사되었습니다. 📋'); }
function navTo(el) { document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active')); el.classList.add('active'); closeSubPage(); }
function openMyBookings() { openSubPage('my-bookings'); renderIntegratedFavorites(); }
function switchBookingTab(index, el) { document.querySelectorAll('.sub-tab-item').forEach(t => t.classList.remove('active')); el.classList.add('active'); document.querySelectorAll('.tab-panel').forEach((p, i) => p.classList.toggle('active', i === index)); }
function renderIntegratedFavorites() {
    const container = document.getElementById('integratedFavoriteContainer'); const standaloneContainer = document.getElementById('standaloneFavoriteContainer');
    if(!container || !standaloneContainer) return;
    const item = hospitalData[0];
    const cardHtml = `<div class="card" onclick="openHospitalDetail(${item.id})"><button class="favorite-btn active"><span class="material-symbols-outlined">favorite</span></button><div class="card-img" style="background:url('${item.img}') center/cover;"></div><div class="card-info"><div class="card-title">${item.name}</div><div class="card-desc">역삼동 • <span class="distance-tag">${item.distance}</span></div><div class="card-rating"><span class="material-symbols-outlined star-icon" style="color:var(--star-yellow); font-variation-settings:'FILL' 1;">star</span>4.9</div></div></div>`;
    container.innerHTML = cardHtml; standaloneContainer.innerHTML = cardHtml;
}
function renderHospitals() {
    const container = document.getElementById('hospitalContainer'); if(!container) return;
    container.innerHTML = hospitalData.map(item => `<div class="card" onclick="openHospitalDetail(${item.id})"><button class="favorite-btn" onclick="event.stopPropagation(); this.classList.toggle('active');"><span class="material-symbols-outlined">favorite</span></button><div class="card-img" style="background:url('${item.img}') center/cover;"></div><div class="card-info"><div class="status-badge ${item.isOpen ? 'open' : 'closed'}">${item.isOpen ? '영업중' : '영업종료'}</div><div class="card-title">${item.name}</div><div class="card-desc">${item.addr.split(' ')[2]} • <span class="distance-tag">${item.distance}</span></div><div class="card-rating"><span class="material-symbols-outlined star-icon" style="color:var(--star-yellow); font-variation-settings:'FILL' 1;">star</span>${item.rating}</div></div></div>`).join('');
}
let toastTimer; function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2000); }
let currentAdIndex = 0; function startAdSlider() { setInterval(() => { currentAdIndex = (currentAdIndex + 1) % 3; updateAdUI(); }, 4000); }
function updateAdUI() { const s = document.getElementById('adSlider'); const ds = document.querySelectorAll('.dot'); if(s) s.style.transform = `translateX(-${(currentAdIndex * 100) / 3}%)`; ds.forEach((d, i) => d.classList.toggle('active', i === currentAdIndex)); }
function initAdSwipe() { const c = document.getElementById('adSliderContainer'); let sx = 0; if(!c) return; c.addEventListener('touchstart', (e) => sx = e.touches[0].clientX, {passive:true}); c.addEventListener('touchend', (e) => { const diff = sx - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { currentAdIndex = (diff > 0 ? (currentAdIndex + 1) : (currentAdIndex - 1 + 3)) % 3; updateAdUI(); } }, {passive:true}); }
function initDragScroll() { document.querySelectorAll('.drag-scrollable').forEach(a => { let id = false; let sx, sl; a.onmousedown = (e) => { id = true; sx = e.pageX - a.offsetLeft; sl = a.scrollLeft; }; a.onmouseleave = () => id = false; a.onmouseup = () => id = false; a.onmousemove = (e) => { if(!id) return; e.preventDefault(); const w = (e.pageX - a.offsetLeft - sx) * 2; a.scrollLeft = sl - w; }; }); }
function initPetCardSwitch() { const cards = document.querySelectorAll('.pet-card'); const observer = new IntersectionObserver((e) => e.forEach(en => en.target.classList.toggle('active-pet', en.isIntersecting)), {root:document.getElementById('petScrollArea'), threshold:0.6}); cards.forEach(c => observer.observe(c)); }


/* 카카오 택시 */
function openKakaoT() {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    const appScheme = "kakaot://"; // 카카오T 앱 실행 주소
    const playStore = "https://play.google.com/store/apps/details?id=com.kakao.taxi";
    const appStore = "https://apps.apple.com/kr/app/id981110467";

    if (!isIOS && !isAndroid) {
        // PC 브라우저인 경우 안내 메시지
        showToast("모바일 기기에서 앱을 실행할 수 있습니다.");
        window.open("https://t.kakao.com/", "_blank"); // 웹 사이트 열기
        return;
    }

    const startAt = +new Date();
    
    // 앱 실행 시도
    location.href = appScheme;

    // 1.5초 후에도 화면 변화가 없다면(앱 미설치 시) 스토어로 이동
    setTimeout(function() {
        if (+new Date() - startAt < 2000) {
            if (isIOS) {
                location.href = appStore;
            } else {
                location.href = playStore;
            }
        }
    }, 1500);
}