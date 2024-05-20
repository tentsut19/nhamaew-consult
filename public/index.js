document.addEventListener('DOMContentLoaded', function () {
    initializeLiff();
});

var roomNumber;
var profile;

async function initializeLiff() {
    try {
        console.log('--- initializeLiff ---')
        await liff.init({ liffId: LIFF_ID });

        const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
        const params = new URLSearchParams(queryString);
        const userId = params.get('userId');
        if (userId != null && userId != '') {
            console.log(userId);
        }

        if (!liff.isLoggedIn() && PROD) {
            const destinationUrl = window.location.href;
            liff.login({redirectUri: destinationUrl});
            return;
        }

        if (PROD) {
            friendship = await liff.getFriendship();
            console.log(friendship);
            if(!friendship.friendFlag){
                Swal.fire({
                    //   title: 'ยืนยันการส่งข้อมูลใช่ไหม?',
                    //   text: "เมื่อกดยืนยัน คุณจะได้รับเลขนัดปรึกษาสัตวแพทย์ทางไลน์ หากไม่ได้รับกรุณาติดต่อแอดมิน",
                    html: "<b style='font-size: 24px;'>ปรึกษาสัตวแพทย์<br>เฉพาะผู้ที่เป็นเพื่อนกับ LINE<br>หน้าแมวเอไอ (Nhamaew Ai) เท่านั้น</b><br><br><label style='font-size: 20px;'></label>",
                    icon: 'warning',
                    showCancelButton: false,
                    allowOutsideClick: false,
                    confirmButtonColor: '#06c755',
                    confirmButtonText: 'เพิ่มเพื่อน Nhamaew Ai'
                }).then((result) => {
                    console.log(result);
                    window.location.href = "https://lin.ee/ZHdJ99P";
                })
            }
        }

    } catch (error) {
        alert('เกิดข้อผิดพลาด');
        console.error('API Error:', error);
    }
}

// async function selectAnimalType(value){
//     try {
//         if (!liff.isLoggedIn() && PROD) {
//             const destinationUrl = window.location.href;
//             liff.login({redirectUri: destinationUrl});
//             return;
//         }

//         var profile
//         if (PROD) {
//             profile = await liff.getProfile();
//         }else{
//             profile = profileTest;
//         }

//         document.getElementById("overlay").style.display = "block";

//         const response = await fetch(URL_UPDATE_ANIMAL_TYPE, {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 lineUserId: profile.userId,
//                 displayName: profile.displayName,
//                 statusMessage: profile.statusMessage,
//                 pictureUrl: profile.pictureUrl,
//                 animalType: value
//             })
//         });

//         document.getElementById("overlay").style.display = "none";
//         console.log('response:', response);
//         if(response.status == 200){
//             const data = await response.json();
//             console.log('API Response:', data);
//             liff.closeWindow();
//         }else{
//             swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
//         }
//     } catch (error) {
//         document.getElementById("overlay").style.display = "none";
//         swalError('เกิดข้อผิดพลาด','');
//         console.error('API Error:', error);
//     }
// }

function swalError(title,text){
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        
      })
}