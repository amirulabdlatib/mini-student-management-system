<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends StoreStudentRequest
{
    public function rules(): array
    {
        $rules = parent::rules();

        $rules['email'] = [
            'required',
            'string',
            'email',
            Rule::unique('students', 'email')->ignore($this->route('student'))
        ];

        return $rules;
    }
}
