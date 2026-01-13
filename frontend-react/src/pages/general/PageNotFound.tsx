const PageNotFound = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 fixed inset-0">
            <img
                src="/page_not_found.jpg"
                alt="Logo"
                className="w-40 h-40 mb-6 animate-bounce "
            />

            <div className="text-center">
                <p className="text-lg text-gray-600 mb-6">Trang bạn tìm không tồn tại</p>
            </div>
        </div>
    )
}

export default PageNotFound
