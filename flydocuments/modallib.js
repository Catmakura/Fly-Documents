(function (global) {
/* =====================
  モーダルの初期化
===================== */
    function initModal(modalId, closeButtonId) {
        const modal = document.getElementById(modalId), closeButton = document.getElementById(closeButtonId);
        if (modal && closeButton) {
            closeButton.addEventListener('click', () => closeModal(modalId));
            modal.addEventListener('click', (e) => e.target === modal && closeModal(modalId));
            document.addEventListener('keydown', (e) => (e.key === 'Escape' || e.key === ' ' || e.key === 'Spacebar') && closeModal(modalId));
        } else {
            console.error('モーダルまたは閉じるボタンが見つかりません: ', modalId, closeButtonId);
        }
    }


/* ==========================================
  モーダルの表示 (オプションで時間指定可能)
========================================== */
function showModal(modalId, autoCloseTime) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            // 自動で閉じる場合の処理
            if (autoCloseTime && typeof autoCloseTime === 'number') {
                setTimeout(() => closeModal(modalId), autoCloseTime);
            }
        } else {
            console.error('モーダルが見つかりません: ' + modalId);
        }
    }


/* =====================
  モーダルの非表示
===================== */
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
        else console.error('モーダルが見つかりません: ' + modalId);
    }


/* =====================
  モーダルの更新
(コンテンツ)
===================== */
    function updateModalContent(modalId, content) {
        const modalBody = document.getElementById(modalId)?.querySelector('.modal-body');
        if (modalBody) modalBody.innerHTML = content;
    }


/* =====================
  モーダルの更新
(ヘッダー)
===================== */
    function updateModalHeader(modalId, headerText) {
        const modalHeader = document.getElementById(modalId)?.querySelector('.modal-header');
        if (modalHeader) modalHeader.innerHTML = headerText;
    }


/* =====================
  通知モーダルの初期化
===================== */
    function initNotificationModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) setTimeout(() => closeNotificationModal(modalId), 3000);
        else console.error('モーダルが見つかりません: ', modalId);
    }


/* =====================
  通知モーダルの表示
===================== */
    function showNotificationModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 10);
        }
    }


/* =====================
  通知モーダルの非表示
===================== */
    function closeNotificationModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 500);
        }
    }


/* =====================
  ライブラリを公開
===================== */
    global.ModalLib = {
        initModal, showModal, closeModal, updateModalContent, updateModalHeader,
        initNotificationModal, showNotificationModal, closeNotificationModal
    };
})(window);
