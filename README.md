# frontend

## todo
- 공통으로 사용하는 함수는 common.js 로 빼놓자
- 우선은 boardList 최우선으로 작업하자

게시판 컴포넌트에 대해서 자주 사용되는것은 컴포넌트화로
부모 컴포넌트에서 자식컴포넌트에게 보내주는게 맞다.
패치함수를 넘겨주는 방법도 있음
조회게시판 먼저 first!
추상메서드패턴??

컴포지션으로 해야됨!

### 트러블
검색조건을 만들던 도중
```
Access to XMLHttpRequest at 'http://localhost:8080/boards?categoryNo=[object+Object]&keyword=[object+Object]' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
이 오류가 계속 생김

서버에서 cors 설정을
```
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("*")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}

```
위와같이 설정했어도 에러가 생김
categoryNo=[object+Object]
이부분이 문제 인것 같음
특정값으로 파싱하지 않고 object값을 전해주고있다.

#### 해결
compositionAPI로 ref를 통해 반응형 데이터를 전달할때 확인해보니
```
const keyword = ref();
```
keyword라는 데이터를 보내줄때 object형태로 여러가지 데이터가 모여서 뿌려지는 것을 확인했다.
그렇기에 데이터를 전달할때
```
params: {
          keyword: keyword,
```
가 아닌
```
params: {
          keyword: keyword.value,
```
라고 적어주어 object인 keyword 안에 있는 value값을 보내주면 된다.
아주 기초적인 실수였다.ㅎ




<details>
<summary>Vue.js 프로젝트 생성 에러 기록</summary>

Vue 설정 오류 해결
- https://araikuma.tistory.com/117

Vue 파일을 생성하면 리눅스상 소유권자가 root로 되어있음
<br/>
backend 파일들은 소유권자 내 이름으로 되어있음
<br/>
이렇게 될 경우 파일들의 소유권이 달라 read-only 파일로써 읽기전용으로만 가능
<br/>
심지어 해제 불가능 (오류 발생)
<br/>
frontend 디렉토리 하위 소유권자를 내이름으로 전부 바꿈
해결

<br/>
sudo chown -R {소유권자}:{그룹식별자} {소유권을 변경하고 싶은 디렉토리명}

<br/>
예시:
sudo chown -R mogreene:staff {소유권을 변경하고 싶은 디렉토리명}

</details>

