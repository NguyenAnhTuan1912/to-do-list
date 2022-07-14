1. Project To-do list sẽ bao gồm các thành phần sau:
    a. Thành phần:
        - Root container chứa tất cả các element con.
        - Trong root container chia thành 3 container nhỏ hơn:
            - To-do items container.
            - Modals container.
    b. Các thành phần chính:
        - To-do items container:
            - Như tên gọi thì To-do items container sẽ chứa tẩt cả những to-do item container, các item con này chứa những nội dung như:
                + Title của công việc.
                + Mô tả ngắn.
                + Loại công việc.
                + 3 button xem chi tiết, "hoàn thành" và Xoá.
        - Modals container:
            - To-do item creator container:
                - 2 input, 1 để nhập title, 1 để nhập mô tả ngắn.
                - Các check box mô tả loại công việc. 
                - 2 button, 1 để thêm, 1 để huỷ.
            - Detail view, sẽ cho phép người xem xem được đầy đủ các thông tin như sau:
                - Title.
                - Mô tả ngắn.
                - Loại công việc.
                - Thời gian tạo item.
                - 2 button thoát và edit.
            - Edit item, sẽ cho phép người dùng chính sửa lại nội dung của item, thành phần tương tự như To-do item creator, nhưng sẽ có chút khác biệt.
Chức năng cụ thể sẽ nói ở phần dưới.

2. Chức năng của từng thành phần trong Project (cái này ghi sau)

3. Các câu lệnh
Compiler Layout.scss: sass ./layout.scss ./css/layout.css --watch
Compiler todolist.scss: sass ./todolist.scss ./css/todolist.css --watch
Compiler editadditem.scss: sass ./editadditem.scss ./css/editadditem.css --watch
Compiler responsive.scss: sass ./responsive.scss ./css/responsive.css --watch