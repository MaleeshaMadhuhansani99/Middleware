package com.sricare.customerservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private final CustomerService customerService;
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<Customer> fetchAllCustomers(){
        return customerService.fetchAllCustomers();
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Customer createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }


}
