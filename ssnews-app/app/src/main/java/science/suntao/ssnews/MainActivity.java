package science.suntao.ssnews;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebView;


public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_main);
        //实例化WebView对象
        webView = new WebView(this);
        //设置WebView属性，能够执行Javascript脚本
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebContentsDebuggingEnabled(true);
        try {
            //设置打开的页面地址
            webView.loadUrl("https://ssnews.suntao.science/demo");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        setContentView(webView);
    }

    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()) {

            webView.goBack();
            return true;
        } else
        {
            this.finish();
            return  false;
        }
    }


}
