# blog2backend
Энэ бол express server, mysql ашигласан nodejs төсөл бөгөөд API сервис үзүүлнэ

1. Ажиллуулахын тулд юу шаардлагатай вэ?
-mysql сервер суулгаж, blog бааз үүсгэн table дотор post, user нэртэй хүснэгтүүдийг зураг дээрх талбартайгаар үүсгэнэ. 
https://raw.githubusercontent.com/Ochirpurev20/blog2backend/5e10aa6c8a8fe99ae381be24740faaabaf8f3663/mysql%20post%20table.png

https://raw.githubusercontent.com/Ochirpurev20/blog2backend/5e10aa6c8a8fe99ae381be24740faaabaf8f3663/mysql%20user%20table.png

2. Юу хийдэг вэ?
-Хэрэглэгчтэй холбоотой дараах замуудыг сонсоно. 

  app.get("/api/user")- бүртгэлтэй бүх хэрэглэгчийн мэдээллийг буцаана.

  app.post("/api/user/create")- шинэ хэрэглэгч үүсгэнэ

  app.post("/api/user/login")- нэвтэрч буй хэрэглэгчийн нэр, нууц үгийг бааз дээрхтэй тулгаж хариу үзүүлнэ.

-Посттой холбоотой дараах замуудыг сонсоно.

app.get("/api/read")- бүх постыг зарим мэдээлэл буцаана

app.get("/api/read/:id")- тухайн id дээрх 1 постыг бүх мэдээлэлтэй нь буцаана

app.post("/api/create")- шинэ пост үүсгэнэ

app.delete("/api/delete")- id дээрх 1 постыг устгана

app.put("/api/update")- id дээрх 1 постыг шинэчилнэ.
