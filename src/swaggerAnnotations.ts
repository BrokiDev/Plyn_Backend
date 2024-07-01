/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: User login
 *     description: This endpoint allows users to log in to the application. It expects an email and password in the request body. If the credentials are valid, it returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user. Must be a valid email address.
 *               password:
 *                 type: string
 *                 description: The password of the user. Must be at least 8 characters.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                  type: string
 *                  description: A JWT token for authenticating subsequent requests.
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Bad Request. This usually means the request body didn't validate.
 *       401:
 *         description: Unauthorized. This usually means the email or password were incorrect.
 */

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: User registration
 *     description: This endpoint allows new users to register to the application. It expects a first name, last name, company name (optional), email, password and role (optional) in the request body. If the registration is successful, it returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fName:
 *                 type: string
 *                 description: The first name of the user.
 *               lName:
 *                 type: string
 *                 description: The last name of the user.
 *               companyName:
 *                 type: string
 *                 description: The company name of the user. This field is optional.
 *               email:
 *                 type: string
 *                 description: The email of the user. Must be a valid email address.
 *               password:
 *                 type: string
 *                 description: The password of the user. Must be at least 8 characters.
 *               role:
 *                 type: string
 *                 description: The role of the user. This field is optional.
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                  type: string
 *                  description: A JWT token for authenticating subsequent requests.
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Bad Request. This usually means the request body didn't validate.
 *       409:
 *         description: Conflict. This usually means the email is already registered.
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
