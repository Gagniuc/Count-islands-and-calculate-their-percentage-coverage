let a = [
        [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
        [ 1, 0, 1, 0, 1, 1, 0, 0, 1, 1 ],
        [ 1, 1, 1, 0, 1, 1, 0, 0, 0, 1 ],
        [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
        [ 1, 1, 1, 0, 1, 1, 1, 0, 1, 0 ],
        [ 1, 0, 1, 1, 1, 1, 0, 0, 0, 0 ],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
        [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 1 ],
        [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 1 ]
        ];
    
let b = [
        [+1, 0], // right side element
        [-1, 0], // left side element
        [ 0,+1], // upward side element
        [ 0,-1], // downward side element
        [+1,+1], // upward-right side element
        [-1,-1], // downward-left side element
        [+1,-1], // downward-right side element
        [-1,+1], // upward-left side element
        ];
        
let q = ['*','#','%','&','@','$','!','+','^'];
let p = [];

p[0] = [];
p[1] = [];
p[2] = [];
    
print('Islands = ' + SCAN(a) + '\n');
print(SMC(a, 1));
print(SMC(p, 4));
    
function d(a, i, j, n, m, c)
{
    if(i<0||j<0||i>(n-1)||j>(m-1)||a[i][j]!=1)
    {
        return;
    }
 
    if (a[i][j] == 1)
    {
        a[i][j] = q[c-1];
        //a[i][j] = c + 1;

        p[0][c-1] = a[i][j];
        p[1][c-1] += 1;
        
        for (let k=0; k<b.length; k++)
        { 
            d(a,i+b[k][0],j+b[k][1],n,m,c);
        }
    }
}

function SCAN(a)
{
    let n = a.length;    // row
    let m = a[0].length; // col
    let c = 0;           // islands
      
    for (let i=0; i<n; i++){
        for (let j=0; j<m; j++)
        {
            if (a[i][j] == 1)
            {
                c++;
                p[1][c - 1] = 0;
                d(a, i, j, n, m, c);
      p[2][c-1]=(100/(n*m))*p[1][c-1];
      p[2][c-1] = Math.round(p[2][c-1],0)+'%';
            }
        }
    }
    return c;
}

function SMC(m,f) {
    let r = '';
    for(let i=0; i<m.length; i++) {
        for(let j=0; j<m[i].length; j++) {
            r += m[i][j] + ps(m[i][j], f);      
        }
        r += '\n';
    }
    return r;
}

function ps(a, f) {
    let t = '';
    b = f - (a.toString().length % f);
    for(let i=0; i<b; i++) {t += ' ';}
    return t;
}

// Ex. (213) - Count islands and calculate their percentage coverage.

// References

// Paul A. Gagniuc. Coding Examples from Simple to Complex - Applications in Python, Springer, 2024, pp. 1-245.
// Paul A. Gagniuc. Coding Examples from Simple to Complex - Applications in MATLAB, Springer, 2024, pp. 1-255.
// Paul A. Gagniuc. Coding Examples from Simple to Complex - Applications in Javascript, Springer, 2024, pp. 1-240.