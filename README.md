# frontend

## Project setup
```
npm install
```

## todo
- 공통으로 사용하는 함수는 common.js 로 빼놓자
- 우선은 boardList 최우선으로 작업하자

게시판 컴포넌트에 대해서 자주 사용되는것은 컴포넌트화로
부모 컴포넌트에서 자식컴포넌트에게 보내주는게 맞다.
패치함수를 넘겨주는 방법도 있음
조회게시판 먼저 first!
추상메서드패턴??

컴포지션으로 해야됨!


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
