(def defmacro (macro (name args body) (def name (macro args body))))
; (def defn (macro (name args body) (def name (lambda args body)))) ;
(defmacro defn (name args body) (def name (lambda args body))) 

(def eq? =)
(def nil '())
(defmacro null? (l) (eq? l nil))

(defmacro while (condition body) cond condition (0 body (while condition body)))

; SF, BO, BP ;
(defmacro symbol? (x) (eq? (typeof x) "Symbol"))
(defmacro list?   (x) (eq? (typeof x) "ConsList"))
(defmacro lambda? (x) (eq? (typeof x) "Lambda"))
(defmacro macro?  (x) (eq? (typeof x) "Macro"))
(defmacro bool?   (x) (eq? (typeof x) "bool"))
(defmacro string? (x) (eq? (typeof x) "str"))
(defmacro int?    (x) (eq? (typeof x) "int"))
(defmacro float?  (x) (eq? (typeof x) "float"))
(defmacro number? (x)
    (cond (eq? (typeof x) "int") true
          (eq? (typeof x) "float") true
          false))

(defmacro atom? (x)
    (cond (eq? (typeof x) "ConsList") false
          (eq? (typeof x) "Lambda") false
          (eq? (typeof x) "Macro") false
          true ))
(defmacro free-sym (x) (eq? (typeof x) "Symbol"))

(def \n "
")

(defn tolist (x) (cond (list? x) x (cons x nil)))
(defn inl (x) (cons x nil))
(defn ntimes (n f x) (cond (<= n 0) x (ntimes (- n 1) f (f x))))
(defn inln (n x) (ntimes n inl x))

(defn not (x)   (cond x false true))
(defmacro and (x y) (cond x y false))
(defmacro or  (x y) (cond x true y))
(defmacro xor (x y) (cond (eq? x y) false true))
(defn abs (x) cond (> 0 x) (- 0 x) x)
(defn id (x) x)

(defmacro cadr (l) (car (cdr l)))
(defmacro cddr (l) (cdr (cdr l)))
(defmacro caar (l) (car (car l)))
(defmacro cadar (l) (cadr (car l)))

(defmacro match (vals args)
    (cond (null? vals) (null? args)
          (symbol? (car args))
              (cond (and (null? (cdr args)) (not (null? (cdr vals))))
                        ((def (car args) vals) true)
                            ((def (car args) (car vals))
                             (match (cdr vals) (cdr args))))
          (list? (car args))
              (and (list? (car vals))
                   (and (match (car vals) (car args))
                        (match (cdr vals) (cdr args))))
          (or (bool? (car args)) (or (string? (car args)) (number? (car args))))
              (and (eq? (car args) (car vals)) (match (cdr vals) (cdr args)))
          false))

;(defmacro make (body) mapa (lambda (x) eval x) body);
(defmacro make (l)
    (cond (atom? l) (eval l)
          (null? l) nil
                    (cons (make (car l)) (make (cdr l)))))

(defn list-from-to (a b)
    (defn go (i l) (cond (< i a) l (go (- i 1) (cons i l)) ))
    (go b nil))

(defn replicate (n x)
    (defn go (n a) cond (>= 0 n) a (go (- n 1) (cons x a)))
    (go n nil))

(defn list-ref (n l) (cond (= 0 n) (car l) (list-ref (- n 1) (cdr l))))

(defn length (l)
    (defn go (l i) (cond (null? l) i (go (cdr l) (+ 1 i)) ))
    (go l 0))

;(defn append (l1 l2) (cond (null? l1) l2 (cons (car l1) (append (cdr l1) l2))));
(defn append (l1 l2)
    (defn go (l1 l2) (cond (null? l1) l2 (go (cdr l1) (cons (car l1) l2))) )
    (go (reverse l1) l2) )

(defn take (n l)
    (cond (null? l) nil
          (> n 0) (cons (car l) (take (- n 1) (cdr l)))
          nil))

(defn drop (n l)
    (cond (null? l) nil
          (> n 0) (drop (- n 1) (cdr l))
          l))

(defn foldl (f a l)
    (cond (null? l) a
          (foldl f (f (car l) a) (cdr l)) ))

(defn foldr (f a l)
    (cond (null? l) a
          (f (car l) (foldr f a (cdr l))) ))

(defn unfold (a p f) (cond (p a) nil (cons a (unfold (f a) p f))))

(defn reverse (l) (foldl cons nil l))
(defn elem   (x l) (cond (null? l) false (eq? x (car l)) true (elem   x (cdr l))))
(defn noelem (x l) (cond (null? l) true (eq? x (car l)) false (noelem x (cdr l))))

(defn any (f l) (cond (null? l) false (f (car l)) true (any f (cdr l))))
(defn all (f l) (cond (null? l) true (f (car l)) (all f (cdr l)) false))

(defn span (f l)
    (defn go (l1 l2)
        (cond (null? l2)   (cons (reverse l1) (cons l2 nil))
              (f (car l2)) (cons (reverse l1) (cons l2 nil))
                           (go (cons (car l2) l1) (cdr l2))))
    (go nil l))

(defn chunks-of (n l) (cond (null? l) nil (cons (take n l) (chunks-of n (drop n l))) ))

(defn zipwith (f l1 l2)
    (cond (null? l1) nil
          (null? l2) nil
          (cons (f (car l1) (car l2)) (zipwith f (cdr l1) (cdr l2)))))

(defn filter (f l)
    (defn go (a l)
        (cond (null? l) a
              (f (car l)) (cons (car l) (go a (cdr l)))
              (go a (cdr l))))
    (go nil l))

;(defn map (f l) (cond (null? l) nil (cons (f (car l)) (map f (cdr l)))));
(defn map (f l)
    (defn go (l a) (cond (null? l) a (go (cdr l) (cons (f (car l)) a)) ))
    (reverse (go l nil)))

(defn nub (l) (cond (null? l) nil
    (cond (elem (car l) (cdr l)) (nub (cdr l)) (cons (car l) (nub (cdr l))) )))

(defn concat (l) (cond (null? l) nil (append (car l) (concat (cdr l))) ))

(defn mapa (f l)
    (cond (atom? l) (f l)
          (null? l) nil
          (cons (mapa f (car l)) (mapa f (cdr l)))))

(defn flatten (l)
    (cond (atom? l) l
          (null? l) nil
          (append (tolist (flatten (car l))) (tolist (flatten (cdr l)))) ))

(defn mapcar (args)
    (def f (car args) ls (cdr args))
    (defn go (ls)
        (def cars (map car ls) cdrs (map cdr ls))
        (cond (elem nil cars) nil (cons (eval (cons 'f cars)) (go cdrs))))
    (go ls))

(defn sort (l)
    cond (null? l) nil (append (sort (filter (lambda (x) <  x (car l)) (cdr l)))
                 (cons (car l) (sort (filter (lambda (x) >= x (car l)) (cdr l))))))
