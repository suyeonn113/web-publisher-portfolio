/* ========================================
 * Calendar Demo
 * - 데모 기준일 고정
 * - 월 자동 생성
 * - 날짜 선택
 * - 어제 / 오늘 / 내일 일정 목록 렌더
 * - roving tabindex
 * - 방향키 이동
 * - 정석 구조: gridcell + button
 * ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const calendarRoot = document.querySelector('.schedule-calendar');
    const calendarGrid = document.querySelector('#schedule-calendar-grid');
    const monthText = document.querySelector('#calendar-month');
    const yearText = document.querySelector('#calendar-year');
    const prevButton = document.querySelector('.schedule-calendar__nav--prev');
    const nextButton = document.querySelector('.schedule-calendar__nav--next');
    const headingButton = document.querySelector('.schedule-calendar__heading');

    const yesterdayList = document.querySelector('#schedule-list-yesterday');
    const todayList = document.querySelector('#schedule-list-today');
    const tomorrowList = document.querySelector('#schedule-list-tomorrow');

    if (
        !calendarRoot ||
        !calendarGrid ||
        !monthText ||
        !yearText ||
        !prevButton ||
        !nextButton ||
        !headingButton ||
        !yesterdayList ||
        !todayList ||
        !tomorrowList
    ) {
        return;
    }

    /* =========================
     * 1) 데모 기준일
     * ========================= */
    const DEMO_TODAY = '2026-03-23';

    /* =========================
     * 2) 데모 일정 데이터
     * ========================= */
    const mockEvents = [
        { id: 1, type: 'program', title: '청소년 진로 탐색 워크숍', date: '2026-03-22' },
        { id: 2, type: 'center-event', title: '센터 운영 회의', date: '2026-03-22' },

        { id: 3, type: 'program', title: '디지털 드로잉 클래스', date: '2026-03-23' },
        { id: 4, type: 'center-event', title: '상반기 정직원 채용 면접', date: '2026-03-23' },
        { id: 5, type: 'closed-day', title: '정기 휴관일 안내', date: '2026-03-23' },

        { id: 6, type: 'center-event', title: '센터 일정 점검', date: '2026-03-24' },
        { id: 7, type: 'program', title: '청소년 미디어 활동', date: '2026-03-24' },

        { id: 8, type: 'program', title: '멘토링 프로그램', date: '2026-03-10' },
        { id: 9, type: 'center-event', title: '우수 기관 시상식', date: '2026-03-14' },
        { id: 10, type: 'closed-day', title: '시설 점검 휴관', date: '2026-03-28' },
        { id: 11, type: 'program', title: '봄맞이 특별 행사', date: '2026-04-02' },
        { id: 12, type: 'program', title: '자기소개서 클리닉', date: '2026-04-07' }
    ];

    /* =========================
     * 3) 상태
     * ========================= */
    const demoTodayDate = parseLocalDate(DEMO_TODAY);

    let currentViewDate = new Date(
        demoTodayDate.getFullYear(),
        demoTodayDate.getMonth(),
        1
    );

    let selectedDateStr = DEMO_TODAY;
    let focusedDateStr = DEMO_TODAY;

    /* =========================
     * 4) 유틸
     * ========================= */
    function parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function addDays(dateString, offset) {
        const date = parseLocalDate(dateString);
        date.setDate(date.getDate() + offset);
        return formatDate(date);
    }

    function getEventsByDate(dateString) {
        return mockEvents.filter((event) => event.date === dateString);
    }

    function getTypeLabel(type) {
        if (type === 'program') return '프로그램';
        if (type === 'center-event') return '센터 일정';
        if (type === 'closed-day') return '휴관일';
        return '일정';
    }

    function getFocusableDateStr() {
        return focusedDateStr || selectedDateStr || DEMO_TODAY;
    }

    function focusDateButton(dateString) {
        const targetButton = calendarGrid.querySelector(
            `.schedule-calendar__date[data-date="${dateString}"]`
        );

        if (targetButton) {
            targetButton.focus();
        }
    }

    function moveFocusByOffset(baseDateStr, offset) {
        const nextDateStr = addDays(baseDateStr, offset);
        const nextDate = parseLocalDate(nextDateStr);

        focusedDateStr = nextDateStr;
        currentViewDate = new Date(
            nextDate.getFullYear(),
            nextDate.getMonth(),
            1
        );

        renderCalendar();
        focusDateButton(nextDateStr);
    }

    function selectDate(dateString, options = {}) {
        const {
            focusTargetDateStr = dateString,
            shouldRenderAgenda = true
        } = options;

        const selectedDate = parseLocalDate(dateString);

        selectedDateStr = dateString;
        focusedDateStr = focusTargetDateStr;
        currentViewDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
        );

        renderCalendar();

        if (shouldRenderAgenda) {
            renderAgenda();
        }

        focusDateButton(focusTargetDateStr);
    }

    /* =========================
     * 5) 일정 목록 렌더
     * ========================= */
    function renderAgendaList(listElement, events) {
        listElement.innerHTML = '';

        if (!events.length) {
            listElement.innerHTML = `
                <li class="schedule-agenda__item schedule-agenda__item--empty">
                    일정이 없습니다.
                </li>
            `;
            return;
        }

        const itemsMarkup = events.map((event) => {
            return `
                <li class="schedule-agenda__item">
                    <span
                        class="schedule-calendar__dot schedule-calendar__dot--${event.type}"
                        aria-label="${getTypeLabel(event.type)}"
                    ></span>
                    <p class="schedule-agenda__text">${event.title}</p>
                </li>
            `;
        }).join('');

        listElement.innerHTML = itemsMarkup;
    }

    function renderAgenda() {
        const yesterdayDate = addDays(selectedDateStr, -1);
        const todayDate = selectedDateStr;
        const tomorrowDate = addDays(selectedDateStr, 1);

        renderAgendaList(yesterdayList, getEventsByDate(yesterdayDate));
        renderAgendaList(todayList, getEventsByDate(todayDate));
        renderAgendaList(tomorrowList, getEventsByDate(tomorrowDate));
    }

    /* =========================
     * 6) 날짜 셀 생성
     * ========================= */
    function createDateCell(cellDate, options = {}) {
        const {
            isOutsideMonth = false
        } = options;

        const cellDateStr = formatDate(cellDate);
        const events = getEventsByDate(cellDateStr);
        const isFocused = cellDateStr === getFocusableDateStr();
        const isSelected = cellDateStr === selectedDateStr;
        const isToday = cellDateStr === DEMO_TODAY;

        const cell = document.createElement('div');
        cell.className = 'schedule-calendar__cell';
        cell.setAttribute('role', 'gridcell');
        cell.setAttribute('aria-selected', isSelected ? 'true' : 'false');

        if (isOutsideMonth) {
            cell.classList.add('is-outside-month');
        }

        if (isToday) {
            cell.classList.add('is-today');
        }

        if (isSelected) {
            cell.classList.add('is-selected');
        }

        if (events.length > 0) {
            cell.classList.add('has-event');
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'schedule-calendar__date';
        button.setAttribute('data-date', cellDateStr);
        button.setAttribute(
            'aria-label',
            `${cellDate.getFullYear()}년 ${cellDate.getMonth() + 1}월 ${cellDate.getDate()}일`
        );
        button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        button.tabIndex = isFocused ? 0 : -1;

        if (isOutsideMonth) {
            button.classList.add('is-outside-month');
        }

        if (isToday) {
            button.classList.add('is-today');
        }

        if (isSelected) {
            button.classList.add('is-selected');
        }

        if (events.length > 0) {
            button.classList.add('has-event');
        }

        const dotsMarkup = events.slice(0, 3).map((event) => {
            return `<span class="schedule-calendar__dot schedule-calendar__dot--${event.type}"></span>`;
        }).join('');

        button.innerHTML = `
            <span class="schedule-calendar__date-number">${cellDate.getDate()}</span>
            <span class="schedule-calendar__dots" aria-hidden="true">
                ${dotsMarkup}
            </span>
        `;

        button.addEventListener('focus', () => {
            focusedDateStr = cellDateStr;
        });

        button.addEventListener('click', () => {
            const nextDateStr = addDays(cellDateStr, 1);

            selectDate(cellDateStr, {
                focusTargetDateStr: nextDateStr
            });
        });

        button.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    moveFocusByOffset(cellDateStr, -1);
                    break;

                case 'ArrowRight':
                    event.preventDefault();
                    moveFocusByOffset(cellDateStr, 1);
                    break;

                case 'ArrowUp':
                    event.preventDefault();
                    moveFocusByOffset(cellDateStr, -7);
                    break;

                case 'ArrowDown':
                    event.preventDefault();
                    moveFocusByOffset(cellDateStr, 7);
                    break;

                case 'Home':
                    event.preventDefault();
                    moveFocusByOffset(cellDateStr, -cellDate.getDay());
                    break;

                case 'End':
                    event.preventDefault();
                    moveFocusByOffset(cellDateStr, 6 - cellDate.getDay());
                    break;

                case 'Enter':
                case ' ':
                case 'Spacebar':
                    event.preventDefault();
                    selectDate(cellDateStr, {
                        focusTargetDateStr: addDays(cellDateStr, 1)
                    });
                    break;

                default:
                    break;
            }
        });

        cell.appendChild(button);

        return cell;
    }

    /* =========================
     * 7) 달력 렌더
     * ========================= */
    function renderCalendar() {
        const year = currentViewDate.getFullYear();
        const month = currentViewDate.getMonth();

        monthText.textContent = `${month + 1}월`;
        yearText.textContent = `${year}`;

        calendarGrid.innerHTML = '';

        const firstDay = new Date(year, month, 1);
        const startDay = firstDay.getDay();

        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const totalCells = 42;

        for (let i = 0; i < totalCells; i += 1) {
            let cellDate;
            let isOutsideMonth = false;

            if (i < startDay) {
                const day = daysInPrevMonth - startDay + i + 1;
                cellDate = new Date(year, month - 1, day);
                isOutsideMonth = true;
            } else if (i >= startDay + daysInCurrentMonth) {
                const day = i - (startDay + daysInCurrentMonth) + 1;
                cellDate = new Date(year, month + 1, day);
                isOutsideMonth = true;
            } else {
                const day = i - startDay + 1;
                cellDate = new Date(year, month, day);
            }

            const cell = createDateCell(cellDate, { isOutsideMonth });
            calendarGrid.appendChild(cell);
        }
    }

    /* =========================
     * 8) 월 이동
     * ========================= */
    prevButton.addEventListener('click', () => {
        currentViewDate = new Date(
            currentViewDate.getFullYear(),
            currentViewDate.getMonth() - 1,
            1
        );

        focusedDateStr = formatDate(new Date(
            currentViewDate.getFullYear(),
            currentViewDate.getMonth(),
            1
        ));

        renderCalendar();
        focusDateButton(focusedDateStr);
    });

    nextButton.addEventListener('click', () => {
        currentViewDate = new Date(
            currentViewDate.getFullYear(),
            currentViewDate.getMonth() + 1,
            1
        );

        focusedDateStr = formatDate(new Date(
            currentViewDate.getFullYear(),
            currentViewDate.getMonth(),
            1
        ));

        renderCalendar();
        focusDateButton(focusedDateStr);
    });

    headingButton.addEventListener('click', () => {
        currentViewDate = new Date(
            demoTodayDate.getFullYear(),
            demoTodayDate.getMonth(),
            1
        );

        selectedDateStr = DEMO_TODAY;
        focusedDateStr = DEMO_TODAY;

        renderCalendar();
        renderAgenda();
        focusDateButton(DEMO_TODAY);
    });

    /* =========================
     * 9) 최초 실행
     * ========================= */
    renderCalendar();
    renderAgenda();
});