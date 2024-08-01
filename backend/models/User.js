import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        require: true,
        unique:true
    },
    email :{
        type: String,
        require: true,
        unique:true
    },
    password :{
        type: String,
        require: true,
        unique:true
    },
    photoURL: {
        type:String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAACUCAMAAADxqtj8AAAAMFBMVEXk5ueutLfq7O20urzn6eqpsLOnrbHe4eLW2drQ09W4vcCxt7rIzM7Z3N3T1ti+w8VrD7vIAAAEYUlEQVR4nO2c25arIAxABYMg1///2wOtbadOpxWITVzH/TIza162rAQQEofh5OTk5OTkPwcAqBVaKNrazJloDvUM2VRHP6ppmlSm/Bi90Zd/cAeGMCcxKfGEmkSaA3d/gJicWqkvD6DGFFmHkDRWvFRfHkBYI7n6g05/m98eIPEMHwD/OmTWATQz1M8Dv8G9MCXNzR/MuFE+D78NvPRhdlvdCy5y0oe5xr0Mf5TUzg/mqdJeTGz0IVbLF30ewQNmc74+wSJ1IVQl7IORwcQJw+cF9jV52aXHt8VNZvLU7mBa3cvok8eObR76sujSTptQP9M/6dPu2GTHyBccqXx7yi54wsHXne5l0ieTB99tTzn4tlteJarBh9g/9ITbne6czSiiBRd0f+BkRiL7nk3Cg4ko8DECh26v1ro1XmFp0rbxrWTNRLJV010btB/2JIFvkOwVyfs5TtKWGZ8gdAApaYVIBPYSZa0qULxhSaQpJ6+2FPZIYZ9fsAiyFs9enPanfRMkcY8257hzvq/k2Gvtsfc5aHtMmjsgtP09gXsGR14ommPwY7/XzihpS3QcdfDzHJyzNEsjf+xzzKOfIaOc31O5o9ydUN4adssT3lsd/M5wgCPf1/belZOXGHXVKVC8E/4EQs/QE6bsot+euGqmlu+ojRIcaqNAH7gurYT+gWsCW+sxDbX2nfq3LE6lvNV1yIJ6mXoCoqsZfl414CV1K+rvx0Ctu6am94Ha9RU5+Lf4K8Mram6Unp8P/sox7fnJgDRv/bO74dwvBkP0bt2mt6gr5w3bgV+AQcekfvcZqhQ1d/crMAQ/Xlo8y5DnX0b+o/4ESDkEc2mv1YNk21z4GljI3leohbaRhXPk6xBinO9EE0IOesn5IcpA6+h9Sta6zCNn8x+jtSn52bCMomyu5zQK9+E9ywlnfQBOT1CmGKu2tKdemaYy8zMALtP7rzbyj5T5fw60C8ClA/6PNvINT6CsN5oqk+WQI73vHFPlLKDY+YAMCadIxNn45SQGMD3nlyuU+ObdVd5IOqRb/pu/8l/K4Oxucd0v/sJ/42UX8v4XL2h++o9+76NBueGDD+2Mfs/8hY7j7k0ou+Pwh6ojpzZ/v0/2Alop13t9u8eJCQTEGf6tvpjRhx/m/aPmDvaHRjDu9LejUK9VQO+wPr0F8W4C9BejZgGtlQZ05z64TR+neATC+H33AkYBRvOHNrpBGH2KmL8xzZ03czDQyXeXkEBXCQgCXTfSe+8pP9KzbNVfw6LTflGEVKrbRUex6dY7zF1p3DCTB/2Vxp5/zUK+sS1FEk+Wd1RD9Vrrd8R2oKEfC6i2Ny+oXnIZTPUP6ssy0PrwEHCVsyZOYwAW1UsWj7n+hqubdjTR+9QfVFbN4rRS4VHXGLTnSXELdSsWte2aqtDBat/Eo6KDmMnu8icVH9nBaxlHo6LRQLILHKHi9sjhZ19xshYY2m9P25Z6+r3Z/pma6EZ2VPRvS4Zslj85+cg/E/tCPNWlWFYAAAAASUVORK5CYII="
    }
},{timestamps:true})

const User = mongoose.model("users",userSchema)

export default User