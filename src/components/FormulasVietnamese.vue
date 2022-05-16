<template>
  <div class="c23">
  <p style = "padding-bottom: 2em;">
    {{ $t("This calculator is a collaborative effort of multiple individuals and initiatives. To learn more about us or to get in touch, please visit the") }}
    <a href="https://opencriticalcare.org/">OpenCriticalCare.org Project</a>.
  </p>
  <p class="c8">
    <span class="c18 c45">Công thức và giả định tính toán lượng oxy</span>
  </p>
  <p class="c5"><span class="c3 c18"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c15">Tính toán PaO2 quy đổi:</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3">SaO&#8322; = giá trị người dùng nhập trong khoảng từ 0 to 100%</span>
  </p>
  <p class="c8">
    <span class="c4 c3">FiO&#8322; = giá trị người dùng nhập trong khoảng từ 0 to 100%</span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c4 c3">PO&#8322; quy đổi = </span></p>
  <p class="c8">
    <span class="c4 c3"
      >( 11700 / ( (1/SaO&#8322;) - 1 ) + ( 50^3 + (11700 / ( (1/SaO&#8322;) -
      1 ))^2 ) ^1/2 ) ^ &#8531;</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3">Tỉ lệ P:F quy đổi = Tỉ lệ PO&#8322; / FiO&#8322; quy đổi</span>
  </p>
  <p class="c8">
    <span class="c3">S:F = (SaO&#8322; * 100) / &nbsp;FiO&#8322;</span
    ><span
      style="
        overflow: hidden;
        display: inline-block;
        margin: 0px 0px;
        border: 0px solid #000000;
        transform: rotate(0rad) translateZ(0px);
        -webkit-transform: rotate(0rad) translateZ(0px);
        width: 624px;
        height: 246.67px;
      "
      >
      <img
        style="width: 100%;"
        alt="non-linear equation derived in Brown et al Chest 2016"
        src="../assets/brown_etal_nonlinear_equation_vn.png"
      />
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c15">Công thức tính thời lượng sử dụng bình oxy:</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Hệ số bình oxy cho từng loại bình:</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Cỡ C&#39;: 0.085</span></p>
  <p class="c8"><span class="c3 c4">&nbsp; &#39;Cỡ D&#39;: 0.17</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Cỡ E&#39;: 0.34</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Cỡ F&#39;: 0.68</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Cỡ G&#39;: 1.7</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Cỡ J&#39;: 3.40</span></p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;Cỡ K&#39;: 3.55</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Lượng còn lại = hệ số bình * (áp suất hiển thị trên đồng hồ đo – áp suất dư)</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3">Thời gian còn sử dụng = Lượng còn lại/ Lưu lượng</span>
  </p>
  <p class="c8"><span class="c3">Áp suất tính theo đơn vị psi, lưu lượng tính theo LPM (lít/phút)</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >* Ghi chú: Không có tiêu chuẩn chung áp dụng toàn cầu cho thuật ngữ kích cỡ bình và dung tích. Cần xác nhận với nhà sản xuất địa phương về dung tích và kích cỡ/dung tích bình oxy.
    </span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >* Áp suất hoạt động của bình nhôm trong khoảng 2000-2200 psi, trong khi áp suất làm việc của bình thép có thể rất khác nhau giữa các bình. Cần kiểm tra với nhà sản xuất về thông số kỹ thuật của bình.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c15">Tính toán kích cỡ bình:</span></p>
  <p class="c5"><span class="c18 c3"></span></p>
  <p class="c8">
    <span class="c3 c13">
      Công cụ ước tính dung tích bình oxy sử dụng các phép tính thể tích dựa trên chiều cao, chu vi (hoặc đường kính) và độ dày của thành bình để ước tính thể tích của bình (xem công thức bên dưới). Công cụ tính toán này giả định hình dạng của bình lý thuyết sẽ khác với hình dạng thực của một bình khí - xem ISO 7866 và ISO 9809 để biết thêm chi tiết. Bình thép và nhôm có độ dày thành bình khác nhau và việc biết thông tin về loại bình nào là cần thiết để ước tính chính xác
    </span>
    <span class="c3 c13">
      Dung tích bình khí được tính toán có thể thay đổi so với dung tích thực tế hoặc công bố bởi nhà sản xuất do sự khác biệt giữa độ dày thành bình người dùng nhập vào và độ dày thực tế, hình dạng của đáy hoặc đỉnh của bình hoặc áp suất nạp được sử dụng để xác định dung tích, cũng như các yếu tố khác. Xem ISO7866 và ISO9809
    </span>
  </p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c8">
    <span class="c3 c13"
      >Calculated cylinder volume may vary from actual or manufacturer
      reported cylinder volume due to differences between the entered and
      actual wall thickness, shape of the bottom or top of the cylinder, or
      the fill pressure used to define capacity, among other potential
      factors. See </span
    ><span class="c13 c20">ISO7866 and ISO9809</span>
  </p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c29">
    <span class="c17 c24 c13">Thể tích khí oxy </span
    ><span class="c17 c13"
      >= (áp suất bình theo PSI/2000) x (áp suất bình theo psi/</span
    ><span class="c13 c36">14.696</span
    ><span class="c0"
      >) x pi [(đường kính ngoài  - 2(độ dày thành bình ))/2]^2 x [(chiều cao bình không tính van)-(độ dày thành bình) / 1000 / 1000</span
    >
  </p>
  <p class="c29 c27"><span class="c17 c24 c13 c31"></span></p>
  <p class="c29">
    <span class="c17 c13 c24">Thể tích dạng dung dịch </span
    ><span class="c13 c17"
      >= pi [(đường kính ngoài  - 2(độ dày thành bình ) /2)]^2 x [(chiều cao bình không tính van)-(độ dày thành bình)/ 1000 / 1000</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c15">Công thức tính khả năng cấp oxy:</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c1">Hệ số chuyển đổi</span></p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c8"><span class="c4 c3">1 Gallon = 3.79 Lít</span></p>
  <p class="c8"><span class="c4 c3">1 m3 = 1000 Lít</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c1">Dung tích bình: </span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3">
      Người dùng nhập kích cỡ và số lượng bình. Chúng tôi sử dụng công thức hệ số bình theo lít * số lượng bình.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Cỡ C&#39;:
      170&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Hệ số bình 0.085</span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >&nbsp; &#39;Cỡ D&#39;:
      340&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hệ số bình
      0.17</span
    >
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Cỡ E&#39;:
      680&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Hệ số bình 0.34</span>
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Cỡ F&#39;:
      1360&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Hệ số bình 0.68</span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >&nbsp; &#39;Cỡ G&#39;:
      4100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    >
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Cỡ H&#39;:
      6600&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Hệ số bình 3.14</span>
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Cỡ J&#39;:
      6800&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Hệ số bình 3.4</span>
  </p>
  <p class="c8">
    <span class="c3"
      >&nbsp; &#39;Cỡ K&#39;:
      7100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
    ><span class="c3">Hệ số bình 3.55</span>
  </p>
  <p class="c8"><span class="c4 c3">&nbsp; &#39;7500L&#39;: 7500</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >* Ghi chú: Không có tiêu chuẩn chung áp dụng trên toàn cầu cho thuật ngữ kích cỡ bình và dung tích. Cần xác nhận với nhà sản xuất địa phương về dung tích và kích cỡ/dung tích bình oxy.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Thời lượng còn lại = hệ số bình * (áp suất đo – áp suất dư)/lưu lượng
    </span>
  </p>
  <p class="c8"><span class="c4 c3">Áp suất tính theo đơn vị psi, lưu lượng tính theo LPM (lít/phút)</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c5"><span class="c21 c13"></span></p>
  <p class="c5"><span class="c21 c13"></span></p>
  <p class="c5"><span class="c18 c44"></span></p>
  <p class="c8">
    <span class="c22 c13">Nguồn cung hệ thống PSA và máy tạo oxy:</span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Dữ liệu do người dùng nhập: lượng mỗi phút, chúng tôi sẽ chuyển thành lít mỗi ngày * % số ngày vận hành an toàn * hệ số rò rỉ</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Lượng mỗi phút  * chuyển sang lít * 60 * 24 * % số ngày vận hành an toàn * hệ số rò rỉ</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3"
      >Lượng mỗi giờ * chuyển sang lit * 24 * % số ngày vận hành an toàn * hệ số rò rỉ</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3"
      >Lượng mỗi ngày * chuyển sang lit * % số ngày vận hành an toàn * hệ số rò rỉ</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Với máy tạo oxy, người dùng nhập vào số lượng máy, công cụ sẽ nhân số trên với số lượng máy được nhập vào bởi người dùng.</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c13 c22">Hệ thống oxy lỏng (VIE):</span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3">
      Người dùng nhập dữ liệu theo đơn vị gallon hoặc lít (lưu ý: chúng tôi bỏ qua thông số chiều cao vì chúng tôi không thể tìm được công thức hoặc hệ số tính đáng tin cậy).
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Lượng quy đổi sang lít * 861 * hệ số rò rỉ</span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >861 là hệ số chuyển đổi từ oxy dạng lỏng sang oxy dạng khí.</span
    >
  </p>
  <p class="c8">
    <span class="c3"
      >Đây là kết quả theo phương trình trạng thái khí lý tưởng (định luật khí lý tưởng), và theo điều kiện giả định tại nhiệt độ phòng (thường từ 20C-22C) và áp suất tiêu chuẩn (1 atm):
    </span
    ><span class="c4 c3">:</span>
  </p>
  <ul class="c33 lst-kix_c6484vol7bjv-0 start">
    <li class="c8 c26 li-bullet-0">
      <span class="c3"> Nhiệt độ giả định: </span
      ><span class="c3 c10">20 độ [oC/oF]</span>
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c3">Độ cao so với mực nước biển: </span
      ><span class="c3 c37">0 [feet/met]</span
      ><span class="c3">&nbsp;= 1 atm</span>
    </li>
  </ul>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c4 c3">Phương trình trạng thái khí lý tưởng: PV = nRT</span></p>
  <p class="c8"><span class="c4 c3">P = áp suất (atm) </span></p>
  <p class="c8"><span class="c4 c3">V = thể tích (lít)</span></p>
  <p class="c8">
    <span class="c4 c3">n = số mol (mol)</span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >R = hệ số khí lý tưởng = 0.0821 (đơn vị là (Lít*atm)/(Kelvin*n) )
    </span>
  </p>
  <p class="c8">
    <span class="c4 c3">T = nhiệt độ tuyệt đối (Kelvin) </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <ul class="c33 lst-kix_ggp9jru9blgi-0 start">
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Để tính toán thể tích (đơn vị lít) của oxy dạng khí từ dạng lỏng (đơn vị lít), chuyển số lít oxy lỏng sang số mol oxy.
      </span>
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Nhân số lít oxy lỏng với 1000 để chuyển từ lít sang mL, sau đó nhân với tỷ trọng của oxy lỏng, 1.14g/mL để có được khối lượng oxy. Chia khối lượng oxy cho khối lượng phân tử (32g/mol) để có số lượng mol của oxy.
      </span>
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Chuyển đổi đơn vị nhiệt độ sang Kelvin (nếu là độ C, cộng thêm 273.15).
      </span>
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3">Các dữ liệu trên được nhập vào phương trình trạng thái khí lý tưởng:</span>
    </li>
  </ul>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c42 c48">
    <span class="c4 c3">Số lít khí oxy = V = (nRT) / P</span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Nếu giả định độ cao theo mực nước biển và nhiệt độ, công thức này tương ứng với:
    </span
    >
  </p>
  <ul class="c33 lst-kix_v1p2mms7yikw-0 start">
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Số lit oxy lỏng * 861 = Số lít khí oxy.</span
      >
    </li>
    <li class="c8 c26 li-bullet-0">
      <span class="c4 c3"
        >Hệ số rò rỉ đươc thêm vào để tính toán lượng rò rỉ từ thiết bị.
      </span>
    </li>
  </ul>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c8">
    <span class="c22 c13">Các tính toán về nhu cầu (lượng tiêu thụ của thiết bị) </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3"></span>
    <span class="c4 c3"
      >Người sử dụng nhập số lượng thiết bị và lưu lượng theo đơn vị LPM. Công cụ nhân tổng số lít sử dụng mỗi ngày.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Luôn tham khảo thông số kỹ thuật từ nhà sản xuất, đặc biệt khi sử dụng các thiết bị phân phối oxy với dòng nền, tua bin, và máy nén.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Lượng tiêu thụ của thiết bị không tính đến lượng rò rỉ của thiết bị hoặc rò rỉ ở bộ kết nối là những rò rỉ có thể thường gặp.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c24 c25">Tính toán lượng oxy tiêu thụ:</span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3">
      Lượng tiêu thụ được tính bằng số lít/ngày mà lượng O2 100% được sử dụng, trừ trường hợp có định nghĩa hoặc thiết lập khác từ người sử dụng. Công cụ này không bao gồm việc sử dụng một lượng khí y tế theo yêu cầu trên một số thiết bị.
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3">
      Đối với bối cảnh giường bệnh được mô hình hóa, người dùng có thể vận dụng theo quy mô của khu điều trị và mức độ nghiêm trọng của tình trạng giảm oxy máu của bệnh nhân. Một số cơ sở có thể không thể tiếp cận tới tất cả các thiết bị cấp oxy được đề cập trong danh sách và người sử dụng phải tự đặt thủ công về thành 0. Tính toán lượng oxy tiêu thụ được đưa ra theo quan điểm của các chuyên gia. Mặc dù có những số liệu về sử dụng oxy theo nghiên cứu cắt ngang từ thời kỳ đầu của dịch COVID-19, sự cải tiến của các thực hành hỗ trợ hô hấp - đặc biệt là thời gian đặt nội khí quản và vai trò của máy thở không xâm lấn và liệu pháp oxy dòng cao (HFNC) – vẫn còn có giới hạn trong mức độ mà mà những số liệu này có thể sử dụng để làm hướng dẫn về ước tính nhu cầu oxy hiện nay
    </span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <a id="t.744aa7fb45e67f119b326019eef0c3c60293c5bd"></a><a id="t.0"></a>
  <table class="c14">
    <tbody>
      <tr class="c32">
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c2">Nghiên cứu, tác giả, tạp chí (đường link)</span>
          </p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c2">Tổng số bệnh nhân trong nghiên cứu</span>
          </p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">Nơi thực hiện</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">0-5LPM (Nasal Canula - ống thở)</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">5-10LPM (Facemask – mặt nạ thở)</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">10-15LPM (mặt nạ thở không phục hồi)</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">CPAP/BIPAP</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">HFNC</span></p>
        </td>
        <td class="c6 c7" colspan="1" rowspan="1">
          <p class="c11"><span class="c2">Máy thở cơ</span></p>
        </td>
      </tr>
      <tr class="c39">
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c30 c12"
              ><a
                class="c16"
                href="https://www.google.com/url?q=https://www.atsjournals.org/doi/abs/10.1513/AnnalsATS.202008-1080OC&amp;sa=D&amp;source=editors&amp;ust=1630845893761000&amp;usg=AOvVaw08xMVA6IDDtsdmmy9mNArf"
                >Bellani et al, Annals ATS, 2021</a
              ></span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">8753</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Milan, Italy</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Không áp dụng</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Không áp dụng</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Không áp dụng</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c4 c12"
              >10.4% (bên ngoài ICU); 6.2% trong ICU. Giá trị trung bình FiO2 Cũng cung cấp giá trị phân biệt giữa CPAP và NPPV</span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">0.4%. Giá trị trung bình FiO2 59.2%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">9.20%</span></p>
        </td>
      </tr>
      <tr class="c28">
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c30 c12"
              ><a
                class="c16"
                href="https://www.google.com/url?q=https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7182961/&amp;sa=D&amp;source=editors&amp;ust=1630845893765000&amp;usg=AOvVaw3WfXuk2Va-5dSdJscCpGBn"
                >Meyers et al, Kaiser Permanente Northern California JAMA</a
              ></span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">377</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Bắc CA</span></p>
        </td>
        <td class="c43" colspan="3" rowspan="1">
          <p class="c42"><span class="c4 c12">39.20%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">2.10%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">3.20%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">29.20%</span></p>
        </td>
      </tr>
      <tr class="c47">
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c30 c12"
              ><a
                class="c16"
                href="https://www.google.com/url?q=https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7392471/&amp;sa=D&amp;source=editors&amp;ust=1630845893768000&amp;usg=AOvVaw0ZRVlm6e-kymf1Fu1VIKE-"
                >Ferguson et al, KP Northern California EID</a
              ></span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">72</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">Bắc CA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">30.60%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">8.30%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NA</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">2.80%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">18.10%</span></p>
        </td>
      </tr>
      <tr class="c38">
        <td class="c19" colspan="1" rowspan="1">
          <p class="c11">
            <span class="c12 c30"
              ><a
                class="c16"
                href="https://www.google.com/url?q=https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7256651/&amp;sa=D&amp;source=editors&amp;ust=1630845893786000&amp;usg=AOvVaw1N7SFhfsCTqOSGIDDE_Tpk"
                >Argenziano et al, NYP Columbia BMJ Open</a
              ></span
            >
          </p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">1000</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">NYC</span></p>
        </td>
        <td class="c35" colspan="2" rowspan="1">
          <p class="c42"><span class="c4 c12">56%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">36.50%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">14%</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c11"><span class="c4 c12">4.1% (dụng cụ thở Venturi + HFNC)</span></p>
        </td>
        <td class="c6" colspan="1" rowspan="1">
          <p class="c9"><span class="c4 c12">23.30%</span></p>
        </td>
      </tr>
    </tbody>
  </table>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c5"><span class="c1"></span></p>
  <p class="c8">
    <span class="c1">Đối với ống thở, mặt nạ thở và mặt nạ thở không phục hồi </span>
  </p>
  <p class="c8">
    <span class="c4 c3"
      >FiO2 được giả định là 1.0 và lưu lượng có thể được điều chỉnh theo lít/phút
    </span
    >
  </p>
  <p class="c8">
    <span class="c4 c3"
      >Số lít O2 tiêu thụ theo ngày = lưu lượng của thiết bị L/phút x 60 phút/giờ x 24 giờ/ngày
    </span>
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c1">Đối với HFNC</span></p>
  <p class="c8">
    <span class="c4 c3"
      >FiO2 được điều chỉnh (mặc định tới 1.0) và lưu lượng có thể được điều chỉnh theo lít/phút</span
    >
  </p>
  <p class="c8">
    <span class="c4 c3"
      >Số lít O2 tiêu thụ theo ngày = lưu lượng của thiết bị L/phút x 60 phút/giờ x 24giờ/ngày; lưu lượng theo lít/phút (LPM) = lưu lượng của thiết bị x (FiO2 - 0.21)/0.79
    </span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8"><span class="c1">Đối với máy thở CPAP, BIPAP/NIPPV</span></p>
  <p class="c8">
    <span class="c4 c3"
      >FiO2 được điều chỉnh (mặc định tới 1.0) và lưu lượng có thể được điều chỉnh theo lít/phút và phụ thuộc vào nhiều yếu tố.
    </span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c4 c3"
      >Số lít O2 tiêu thụ theo ngày = tỉ lệ O2 tiêu thụ của thiết bị theo lít/phút x 60 phút/giờ x 24 giờ/ngày
    </span
    >
  </p>
  <p class="c5"><span class="c4 c3"></span></p>
  <p class="c8">
    <span class="c3"
      >Tỉ lệ O2 tiêu thụ của thiết bị theo lít/phút (LPM) = (số phút đặt máy thở + (dòng nền (bias flow) x nhịp thở (RR) x thời gian thở/60) + độ rò) x (FiO2 - 0.21)/0.79
    </span
    >
  </p>
  </div>
</template>

<style scoped>
.lst-kix_v1p2mms7yikw-0>li:before{content:"-  "}.lst-kix_v1p2mms7yikw-1>li:before{content:"-  "}.lst-kix_c6484vol7bjv-2>li:before{content:"-  "}.lst-kix_c6484vol7bjv-1>li:before{content:"-  "}.lst-kix_c6484vol7bjv-0>li:before{content:"-  "}ul.lst-kix_ggp9jru9blgi-4{list-style-type:none}ul.lst-kix_ggp9jru9blgi-5{list-style-type:none}ul.lst-kix_ggp9jru9blgi-6{list-style-type:none}ul.lst-kix_ggp9jru9blgi-7{list-style-type:none}ul.lst-kix_ggp9jru9blgi-0{list-style-type:none}ul.lst-kix_ggp9jru9blgi-1{list-style-type:none}ul.lst-kix_ggp9jru9blgi-2{list-style-type:none}ul.lst-kix_ggp9jru9blgi-3{list-style-type:none}ul.lst-kix_ggp9jru9blgi-8{list-style-type:none}.lst-kix_c6484vol7bjv-3>li:before{content:"-  "}.lst-kix_c6484vol7bjv-4>li:before{content:"-  "}.lst-kix_c6484vol7bjv-5>li:before{content:"-  "}.lst-kix_c6484vol7bjv-6>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-7>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-8>li:before{content:"-  "}.lst-kix_c6484vol7bjv-7>li:before{content:"-  "}.lst-kix_c6484vol7bjv-8>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-3>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-2>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-4>li:before{content:"-  "}ul.lst-kix_v1p2mms7yikw-8{list-style-type:none}.lst-kix_ggp9jru9blgi-6>li:before{content:"-  "}ul.lst-kix_v1p2mms7yikw-5{list-style-type:none}.lst-kix_ggp9jru9blgi-5>li:before{content:"-  "}ul.lst-kix_v1p2mms7yikw-4{list-style-type:none}ul.lst-kix_v1p2mms7yikw-7{list-style-type:none}ul.lst-kix_v1p2mms7yikw-6{list-style-type:none}.lst-kix_ggp9jru9blgi-0>li:before{content:"-  "}.lst-kix_ggp9jru9blgi-1>li:before{content:"-  "}ul.lst-kix_c6484vol7bjv-4{list-style-type:none}.lst-kix_v1p2mms7yikw-8>li:before{content:"-  "}ul.lst-kix_c6484vol7bjv-5{list-style-type:none}ul.lst-kix_c6484vol7bjv-6{list-style-type:none}ul.lst-kix_c6484vol7bjv-7{list-style-type:none}ul.lst-kix_c6484vol7bjv-8{list-style-type:none}.lst-kix_v1p2mms7yikw-7>li:before{content:"-  "}.lst-kix_v1p2mms7yikw-2>li:before{content:"-  "}li.li-bullet-0:before{margin-left:-18pt;white-space:nowrap;display:inline-block;min-width:18pt}ul.lst-kix_v1p2mms7yikw-1{list-style-type:none}ul.lst-kix_v1p2mms7yikw-0{list-style-type:none}ul.lst-kix_v1p2mms7yikw-3{list-style-type:none}ul.lst-kix_v1p2mms7yikw-2{list-style-type:none}.lst-kix_v1p2mms7yikw-3>li:before{content:"-  "}.lst-kix_v1p2mms7yikw-4>li:before{content:"-  "}.lst-kix_v1p2mms7yikw-5>li:before{content:"-  "}ul.lst-kix_c6484vol7bjv-0{list-style-type:none}.lst-kix_v1p2mms7yikw-6>li:before{content:"-  "}ul.lst-kix_c6484vol7bjv-1{list-style-type:none}ul.lst-kix_c6484vol7bjv-2{list-style-type:none}ul.lst-kix_c6484vol7bjv-3{list-style-type:none}ol{margin:0;padding:0}table td,table th{padding:0}.c34{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c19{border-right-style:solid;padding:2pt 2pt 2pt 2pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:bottom;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c41{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:0pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c6{border-right-style:solid;padding:2pt 2pt 2pt 2pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c46{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:0pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:46.8pt;border-top-color:#000000;border-bottom-style:solid}.c35{border-right-style:solid;padding:2pt 2pt 2pt 2pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:93.6pt;border-top-color:#000000;border-bottom-style:solid}.c43{border-right-style:solid;padding:2pt 2pt 2pt 2pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:140.4pt;border-top-color:#000000;border-bottom-style:solid}.c0{background-color:#ffffff;color:#202124;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:italic}.c10{-webkit-text-decoration-skip:none;color:#000000;font-weight:400;text-decoration:underline;vertical-align:baseline;text-decoration-skip-ink:none;font-family:"Arial";font-style:normal}.c1{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:12pt;font-family:"Arial";font-style:italic}.c5{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c15{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:14pt;font-family:"Arial";font-style:normal}.c21{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial"}.c18{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-family:"Arial";font-style:normal}.c22{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:13pt;font-family:"Arial"}.c8{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c4{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-family:"Arial";font-style:normal}.c31{text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial"}.c42{padding-top:0pt;padding-bottom:0pt;line-height:1.15;text-align:center}.c11{padding-top:0pt;padding-bottom:0pt;line-height:1.15;text-align:left}.c29{padding-top:0pt;padding-bottom:0pt;line-height:1.0;text-align:left}.c14{border-spacing:0;border-collapse:collapse;margin-right:auto}.c30{text-decoration-skip-ink:none;-webkit-text-decoration-skip:none;color:#1155cc;text-decoration:underline}.c9{padding-top:0pt;padding-bottom:0pt;line-height:1.15;text-align:right}.c40{color:#212529;font-weight:400;font-family:"Montserrat"}.c23{background-color:#ffffff;padding:72pt 72pt 72pt 72pt}.c37{text-decoration-skip-ink:none;-webkit-text-decoration-skip:none;text-decoration:underline}.c2{font-weight:700;font-family:"Calibri"}.c26{margin-left:36pt;padding-left:0pt}.c33{padding:0;margin:0}.c48{orphans:2;widows:2}.c17{background-color:#ffffff;color:#202124}.c16{color:inherit;text-decoration:inherit}.c39{height:82.5pt}.c47{height:37.5pt}.c24{font-weight:700}.c3{font-size:12pt}.c45{font-size:17pt}.c25{font-size:14pt}.c44{font-size:13pt}.c12{font-size:10pt}.c38{height:48.8pt}.c27{height:11pt}.c36{background-color:#ffffff}.c7{background-color:#d9d9d9}.c20{color:#595959}.c32{height:42pt}.c28{height:71.2pt}.c13{font-style:italic}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}
</style>