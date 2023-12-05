import * as U from './UploadStyle'; 
import * as N from '../Notice/NoticeStyle'; 
import DatePicker from 'react-datepicker';
import './Upload.css'
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCalendarAlt} from 'react-icons/fa';

const placesList = [
  "정문·대학본부", "후문", "인문사회관", "대강의동", "차마리사기념관",
  "학생회관", "도서관·대학원", "예술관", "자연관", "약학관", "기타"
];

const categoriesList = [
  "전자기기", "지갑,카드", "악세사리", "화장품", "기타"
];

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className='input-group'>
      <input type='text' className='form-control' value={value} onClick={onClick} readOnly ref={ref} />
      <U.Inline>
        <div className='input-group-append'>
          <span className='input-group-text'>
            <FaCalendarAlt />
          </span>
        </div>
      </U.Inline>
    </div>
  ));

const PostCreationPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');

  const handleSubmit = () => {
    // 입력된 정보로 POST 요청 보내기
    axios.post('https://port-0-dukfinder-57lz2alpp5sfxw.sel4.cloudtype.app/find_posts/create/', {
      title: title,
      content: content,
      date_select: selectedDate,
      category: selectedCategory,
      LostAndFound: '', // 해당 필드는 공란으로 처리
      location: selectedPlace
    })
      .then(response => {
        setLoggedIn(true);

        axios.get('https://port-0-dukfinder-57lz2alpp5sfxw.sel4.cloudtype.app/find_posts/category/{category}', {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(response => {
          setFindPostData(response.data);
          console.log('카테고리를 불러왔습니다.');
          console.log([response.data]);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
      })
      .catch(error => {
        // 요청 실패 시 실행되는 로직
        console.error('포스트 등록 실패:', error);
      });
  };

  return (
    <U.MainWrapper>
      <N.Section>
        <N.PageTitle>
          <N.TitleText>작성 페이지</N.TitleText>
        </N.PageTitle>
        {/* 제목, 장소, 분류, 일자를 입력하는 섹션 */}
        <U.Wrapper>
          <U.Form>
            <div>
              <U.FormGroup>
                <U.Label style={{ top: '10%' }}>제목</U.Label>
                <U.Input 
                type="text"
                placeholder="습득한 물건명"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
              </U.FormGroup>
            </div>
            <U.Inline>
              <div>
                <U.Label>장소</U.Label>
                <U.Select value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
                  <option value="" disabled hidden>장소를 선택하세요</option>
                  <select id="categoryDropdown">
                  <option value="전자기기">전자기기</option>
                  <option value="지갑,카드">지갑,카드</option>
                  <option value="악세사리">악세사리</option>
                  <option value="화장품">화장품</option>
                  <option value="기타">기타</option>
                  </select>
                </U.Select>
              </div>
              <div>
                <U.Label>분류</U.Label>
                <U.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="" disabled hidden>습득물 분류</option>
                  {categoriesList.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </U.Select>
              </div>
              <div>
                <U.Label>일자</U.Label>
                {/* customInput 컴포넌트 사용 */}
                <U.DatePickerWrapper>
                <div className='App'>
      <DatePicker selected={selectedDate} onChange={date => setDate(date)}/>
    </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  customInput={<CustomInput />}/>
                </U.DatePickerWrapper>
              </div>
            </U.Inline>
          </U.Form>
        </U.Wrapper>
        {/* 메시지와 이미지 업로드를 입력하는 섹션 */}
        <U.Wrapper>
          <U.SecondForm onSubmit={handleSubmit}>
            <div>
              <U.Label>message</U.Label>
              <U.Textarea value={content} onChange={(e) => setContent(e.target.value)}></U.Textarea>
            </div>
            <div>
            <U.InlineImg>
    <U.Label>이미지</U.Label>
    <U.ImgButton>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files[0];
          console.log('Selected File:', file);
          setSelectedFile(file);
        }}
  />
  파일선택
</U.ImgButton>

  </U.InlineImg>


            </div>
            <U.SubmitButton type="submit" value="저장" onClick={handleSubmit}/>
          </U.SecondForm>
        </U.Wrapper>
      </N.Section>
    </U.MainWrapper>
  );
};


// {/* <U.MainWrapper>
//       <N.Section>
//         <N.PageTitle>
//           <N.TitleText>작성 페이지</N.TitleText>
//         </N.PageTitle>
//         {/* 제목, 장소, 분류, 일자를 입력하는 섹션 */}
//         <U.Wrapper>
//           <U.Form>
//             <div>
//               <U.FormGroup>
//                 <U.Label style={{ top: '10%' }}>제목</U.Label>
//                 <U.Input 
//                 type="text"
//                 placeholder="습득한 물건명"
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} />
//               </U.FormGroup>
//             </div>
//             <U.Inline>
//               <div>
//                 <U.Label>장소</U.Label>
//                 <U.Select value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
//                   <option value="" disabled hidden>장소를 선택하세요</option>
//                   {placesList.map((place, index) => (
//                   <option key={index} value={place}>{place}</option>
//                   ))}
//                 </U.Select>
//               </div>
//               <div>
//                 <U.Label>분류</U.Label>
//                 <U.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                   <option value="" disabled hidden>습득물 분류</option>
//                   {categoriesList.map((category, index) => (
//                     <option key={index} value={category}>{category}</option>
//                   ))}
//                 </U.Select>
//               </div>
//               <div>
//                 <U.Label>일자</U.Label>
//                 {/* customInput 컴포넌트 사용 */}
//                 <U.DatePickerWrapper>
//                 <div className='App'>
//       <DatePicker selected={selectedDate} onChange={date => setDate(date)}/>
//     </div>
//                 <DatePicker
//                   selected={selectedDate}
//                   onChange={(date) => setSelectedDate(date)}
//                   customInput={<CustomInput />}/>
//                 </U.DatePickerWrapper>
//               </div>
//             </U.Inline>
//           </U.Form>
//         </U.Wrapper>
//         {/* 메시지와 이미지 업로드를 입력하는 섹션 */}
//         <U.Wrapper>
//           <U.SecondForm onSubmit={handleSubmit}>
//             <div>
//               <U.Label>message</U.Label>
//               <U.Textarea value={content} onChange={(e) => setContent(e.target.value)}></U.Textarea>
//             </div>
//             <div>
//             <U.InlineImg>
//     <U.Label>이미지</U.Label>
//     <U.ImgButton>
//       <input
//         type="file"
//         style={{ display: 'none' }}
//         onChange={(e) => {
//           const file = e.target.files[0];
//           console.log('Selected File:', file);
//           setSelectedFile(file);
//         }}
//   />
//   파일선택
// </U.ImgButton>

//   </U.InlineImg>


//             </div>
//             <U.SubmitButton type="submit" value="저장" onClick={handleSubmit}/>
//           </U.SecondForm>
//         </U.Wrapper>
//       </N.Section>
//     </U.MainWrapper>
//   ); */}