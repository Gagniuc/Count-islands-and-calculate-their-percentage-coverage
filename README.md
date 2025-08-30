# Count islands and calculate their percentage coverage

Ex. (213) - <i>Count islands and calculate their percentage coverage</i>, is presented here in three programming languages: <a href="https://github.com/Gagniuc/Python-Coding-Examples-from-Simple-to-Complex">Python</a>, <a href="https://github.com/Gagniuc/MATLAB-Coding-Examples-from-Simple-to-Complex">MATLAB</a>, and <a href="https://github.com/Gagniuc/JavaScript-Coding-Examples-from-Simple-to-Complex">JavaScript</a>. Although the implementations differ in syntax, the underlying concept remains identical across all three versions. Each code sample is reproduced from its respective volume of the series <i>Coding Examples from Simple to Complex</i> (Springer, 2024).
***

This source code defines a program that processes a 2D array <i>a</i> representing a grid of land and identifies and labels islands on the grid. The code begins by defining a 2D array <i>a</i>, which represents a grid of land with 1s representing land and 0s representing water. Another 2D array <i>b</i> is defined, which represents directional offsets. Each element in <i>b</i> is a pair of coordinates that represent movement in different directions (right, left, up, down, etc.). An array <i>q</i> is defined, containing various characters used to label the islands on the grid (more than before). An empty 2D array <i>p</i> is created to store information about the islands. Next, the code calls the <b><i>SCAN(a)</i></b> function, which scans the grid to identify and label the islands. It then prints the number of islands found and two representations of the grid: the original grid with islands labeled and a grid representation of island information (please see the output above). Inside, the <b><i>SCAN(a)</i></b> function scans the entire grid, calling <b><i>d(a, i, j, n, m, c)</i></b> when it encounters a land element (1). It keeps track of the number of islands found and calculates the percentage of land each island occupies. It returns the total number of islands. Now, the <b><i>d(a, i, j, n, m, c)</i></b> function is a recursive function used to mark and label islands on the grid. It takes the grid <i>a</i>, current coordinates <i>i</i> and <i>j</i>, grid dimensions <i>n</i> and <i>m</i>, and a label <i>c</i>. It checks if the current position is within bounds and if it is part of an island. If so, it marks the position with the label from <i>q</i>, updates island information in <i>p</i>, and recursively explores neighboring positions. The <b><i>SMC(m, f)</i></b> function is used to convert a 2D array <i>m</i> into a string with proper formatting. It uses the <b><i>ps(a, f)</i></b> function to add padding to elements in the matrix for alignment. The <b><i>ps(a, f)</i></b> function, like many strategies used here, was presented in the chapter about functions. Thus, it calculates and returns padding spaces based on the length of the element <i>a</i> and a desired field width <i>f</i>. As a small conclusion, the code effectively identifies and labels islands on the grid, calculates their percentage of coverage, and displays the grid with labels and island information. The significance of this code lies in its practical utility in various applications and its educational value in teaching fundamentals. In order to better understand this example, consider an image that is represented as a matrix <i>a</i>. This image can represent the development of bacterial colonies. Thus, the above algorithm can accurately tell the number of colonies, their area, and much more.

## Example in Python:

```python
a = [
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1]
    ]

b = [
    [1,  0],  # right.
    [-1, 0],  # left.
    [0,  1],  # upward.
    [0, -1],  # downward.
    [1,  1],  # upward-right.
    [-1,-1],  # downward-left.
    [1, -1],  # downward-right.
    [-1, 1],  # upward-left.
    ]

q = ['*','#','%','&','@','$','!','+','^']
p = [[], [], []]

def d(a, i, j, n, m, c):
    if i<0 or j<0 or i>(n-1) or \
    j>(m-1) or a[i][j]!=1:
        return

    a[i][j] = q[c - 1]
    p[1][c - 1] += 1

    for k in range(len(b)):
        d(a,i+b[k][0],j+b[k][1],n,m,c)

def scan(a):
    n = len(a)     # row.
    m = len(a[0])  # col.
    c = 0          # islands.

    for i in range(n):
        for j in range(m):
            if a[i][j] == 1:
                c += 1
                p[0].append(q[c - 1])
                p[1].append(0)
                d(a, i, j, n, m, c)
    for i in range(c):
        p[2].append(f"{round((100/(n*m))*p[1][i])}%")
    return c

def smc(m, f):
    r = ''
    for i in range(len(m)):
        for j in range(len(m[i])):
            r += str(m[i][j]) + \
                 ps(str(m[i][j]), f)
        r += '\n'
    return r

def ps(a, f):
    t = ''
    b = f - (len(a) % f)
    for i in range(b):
        t += ' '
    return t

print('Islands =', scan(a), '\n')
print(smc(a, 1))
print(smc(p, 4))
``` 

```text
Islands = 3 

* 0 * * * * 0 # # # 
* 0 * 0 * * 0 0 # # 
* * * 0 * * 0 0 0 # 
0 0 0 0 * 0 0 0 0 # 
* * * 0 * * * 0 # 0 
* 0 * * * * 0 0 0 0 
* 0 0 0 0 0 0 0 0 % 
* 0 * * * * 0 % % % 
* * 0 0 0 0 0 0 0 % 

*   #   %   
34  8   5   
38% 9%  6%
```

## Example in Javascript:

```javascript
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
```

```text
Javascript output:
Islands = 3 

* 0 * * * * 0 # # # 
* 0 * 0 * * 0 0 # # 
* * * 0 * * 0 0 0 # 
0 0 0 0 * 0 0 0 0 # 
* * * 0 * * * 0 # 0 
* 0 * * * * 0 0 0 0 
* 0 0 0 0 0 0 0 0 % 
* 0 * * * * 0 % % % 
* * 0 0 0 0 0 0 0 % 

*   #   %   
34  8   5   
38% 9%  6%
```

## Example in Matlab:

```matlab
global p_percent;

a = num2cell([
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1];
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 1];
    [1, 1, 1, 0, 1, 1, 0, 0, 0, 1];
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 0];
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0];
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1];
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1]
    ]);

for i = 1:numel(a)
    if a{i} == 0
        a{i} = '0';
    else
        a{i} = '1';
    end
end

b = [
    [+1, 0];  % right.
    [-1, 0];  % left.
    [0, +1];  % up.
    [0, -1];  % down.
    [+1,+1];  % up-right.
    [-1,-1];  % down-left.
    [+1,-1];  % down-right.
    [-1,+1]   % up-left.
    ];

q = {'*','#','%','&','@','$','!','+','^'};
p = zeros(1, numel(q));
p_percent = cell(1, length(q));

[a, p] = SCAN(a, b, q, p);
num_islands = length(p(p > 0));

fprintf('Islands = %d\n\n', num_islands);
fprintf('%s\n', SMC(a));

for i = 1:num_islands
    fprintf('%c %d (%s)\n', ...
             q{i}, p(i), p_percent{i});
end

function [a, p] = d(a,i,j,n,m,c,b,q,p)

    if i < 1 || j < 1 || i > n ...
            || j > m || ~strcmp(a{i,j}, '1')
        return;
    end
    
    a{i,j} = q{c};
    p(c) = p(c) + 1;
    
    for k = 1:size(b,1)
        [a, p] = ...
        d(a, i+b(k,1), j+b(k,2),n,m,c,b,q,p);
    end
end

function [a, p] = SCAN(a, b, q, p)

    global p_percent;

    c = 0;          % Island count.
    n = size(a, 1); % Number of rows.
    m = size(a, 2); % Number of columns.
    
    for i = 1:n
        for j = 1:m
            if strcmp(a{i,j}, '1')

                c = c + 1;

                if c > numel(q)
                    error('Not enough labels');
                end

                p(c) = 0;
                [a, p] = d(a,i,j,n,m,c,b,q,p);

                p_percent{c} = [num2str( ...
                round(100 * p(c) / (n*m)) ...
                ), '%'];
            
            end
        end
    end
end

function r = SMC(m)
    r = '';
    for i = 1:size(m,1)
        for j = 1:size(m,2)
            r = [r, m{i,j}, ' '];
        end
        r = [r, newline];
    end
end
```

```text
Matlab output:
Islands = 3 

* 0 * * * * 0 # # # 
* 0 * 0 * * 0 0 # # 
* * * 0 * * 0 0 0 # 
0 0 0 0 * 0 0 0 0 # 
* * * 0 * * * 0 # 0 
* 0 * * * * 0 0 0 0 
* 0 0 0 0 0 0 0 0 % 
* 0 * * * * 0 % % % 
* * 0 0 0 0 0 0 0 % 

*   #   %   
34  8   5   
38% 9%  6%
```

## References

- <i>Paul A. Gagniuc. Coding Examples from Simple to Complex - Applications in Python, Springer, 2024, pp. 1-245.</i>
- <i>Paul A. Gagniuc. Coding Examples from Simple to Complex - Applications in MATLAB, Springer, 2024, pp. 1-255.</i>
- <i>Paul A. Gagniuc. Coding Examples from Simple to Complex - Applications in Javascript, Springer, 2024, pp. 1-240.</i>

***
