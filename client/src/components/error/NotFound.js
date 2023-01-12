import React from "react";

const NotFound = () => {
    return (
        <>
            <h1>Page Not Found!</h1>
            <br></br>
            <span>
                방문하시려는 페이지의 주소가 잘못 입력되었거나,
            </span>
            <br></br>
            <span>
                페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
            </span>
            <br></br>
            <br></br>
            <span>
                입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
            </span>
            <br></br>
            <br></br>
            <span>
                관련한 사용법은 아래 API 링크를 통해 확인하실 수 있습니다.
            </span>
            <br></br>
            <br></br>

            <a href="/">메인 화면으로 돌아가기</a>
            <br></br>
            <br></br>
        </>
    )
}

export default NotFound;